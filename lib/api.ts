import { TitleSuggestionPayload } from '@/schemas/title-suggestion-payload';
import { ObjectiveSuggestionPayload } from '@/schemas/objective-suggestion-payload';
import {
	SuggestionsResponse,
	SuggestionsResponseSchema,
} from '@/schemas/suggestions-response';
import {
	getAccessToken,
	refreshAccessToken,
	clearTokens,
} from './cookies-storage';

type ApiRequestOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	headers?: Record<string, string>;
	body?: string | FormData;
	requiresAuth?: boolean;
	maxRetries?: number;
};

function parseExpiredAt(accessToken: string): Date | null {
	try {
		const parts = accessToken.split('.');
		if (parts.length !== 3) {
			return null;
		}

		const payload = parts[1];
		// Normalize base64 string by adding padding if needed
		const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
		const padded = normalized + '==='.slice((normalized.length + 3) % 4);

		const decoded = atob(padded);
		const payloadMap = JSON.parse(decoded);

		if (payloadMap.exp) {
			return new Date(payloadMap.exp * 1000);
		}

		return null;
	} catch (error) {
		console.warn('Error parsing token expiration:', error);
		return null;
	}
}

function isPublicRoute(url: string): boolean {
	return (
		url.includes('/public') ||
		url.includes('/openai') ||
		url.includes('/auth/signIn') ||
		url.includes('/auth/register')
	);
}

function isRefreshRoute(url: string): boolean {
	return url.includes('/auth/refreshToken') || url.includes('/refresh');
}

function isAuthRoute(url: string): boolean {
	return url.includes('/auth');
}

function createUnauthorizedResponse(
	message: string = 'Unauthorized'
): Response {
	return new Response(JSON.stringify({ error: message }), {
		status: 401,
		headers: { 'Content-Type': 'application/json' },
	});
}

// Buffer pour le refresh proactif (10 minutes avant expiration)
const PROACTIVE_REFRESH_BUFFER = 10 * 60 * 1000;

export async function makeAuthenticatedRequest(
	url: string,
	options: ApiRequestOptions = {}
): Promise<Response> {
	const {
		method = 'GET',
		headers = {},
		body,
		requiresAuth = true,
		maxRetries = 1,
	} = options;

	// Skip authentication for public routes
	if (isPublicRoute(url) || isRefreshRoute(url)) {
		const requestHeaders: Record<string, string> = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...headers,
		};

		if (body instanceof FormData) {
			delete requestHeaders['Content-Type'];
		}

		return fetch(url, {
			method,
			headers: requestHeaders,
			body,
		});
	}

	let attempt = 0;

	while (attempt <= maxRetries) {
		try {
			const requestHeaders: Record<string, string> = {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				...headers,
			};

			if (requiresAuth) {
				let accessToken = await getAccessToken();

				if (!accessToken) {
					if (!isAuthRoute(url)) {
						console.warn('No access token available');
						await clearTokens();
						return createUnauthorizedResponse(
							'No access token available'
						);
					}
				} else {
					// Vérification proactive de l'expiration seulement si on peut parser le token
					const expiredAt = parseExpiredAt(accessToken);
					if (expiredAt) {
						const now = new Date();
						const timeUntilExpiry =
							expiredAt.getTime() - now.getTime();

						// Refresh proactif si le token expire dans moins de 10 minutes
						if (
							timeUntilExpiry <= PROACTIVE_REFRESH_BUFFER &&
							timeUntilExpiry > 0
						) {
							console.log(
								'Token will expire soon, attempting proactive refresh...'
							);
							const refreshedTokens = await refreshAccessToken();
							if (refreshedTokens) {
								accessToken = refreshedTokens.accessToken;
							}
							// Continuer même si le refresh échoue, on tentera à nouveau si 401
						}
						// Ne pas bloquer si le token est expiré, laisser le serveur décider
					}
				}

				if (accessToken) {
					requestHeaders.Authorization = `Bearer ${accessToken}`;
				}
			}

			if (body instanceof FormData) {
				delete requestHeaders['Content-Type'];
			}

			const response = await fetch(url, {
				method,
				headers: requestHeaders,
				body,
			});

			// Si on reçoit un 401 et qu'on n'a pas encore essayé de refresh
			if (
				response.status === 401 &&
				requiresAuth &&
				attempt < maxRetries &&
				!isRefreshRoute(url)
			) {
				console.log('Received 401, attempting token refresh...');
				const refreshedTokens = await refreshAccessToken();

				if (!refreshedTokens) {
					// Seulement effacer et retourner erreur si c'est vraiment un échec définitif
					await clearTokens();
					return createUnauthorizedResponse('Authentication failed');
				}

				attempt++;
				continue;
			}

			return response;
		} catch (error) {
			if (attempt >= maxRetries) {
				throw error;
			}
			attempt++;
		}
	}

	throw new Error('Max retries exceeded');
}

export async function makeFormDataRequest(
	url: string,
	formData: FormData,
	options: Omit<ApiRequestOptions, 'body'> = {}
): Promise<Response> {
	return makeAuthenticatedRequest(url, {
		...options,
		body: formData,
	});
}

export async function getTitleSuggestions(
	payload: TitleSuggestionPayload
): Promise<SuggestionsResponse> {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/title`,
			{
				method: 'POST',
				body: JSON.stringify(payload),
				requiresAuth: false,
			}
		);

		if (response.status !== 201) {
			throw new Error(
				`Failed to fetch suggestions: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		const validatedData = SuggestionsResponseSchema.parse(data);

		return validatedData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Error fetching title suggestions: ${error.message}`
			);
		}
		throw new Error(
			'Unknown error occurred while fetching title suggestions'
		);
	}
}

export async function getObjectiveSuggestions(
	payload: ObjectiveSuggestionPayload
): Promise<SuggestionsResponse> {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/goal`,
			{
				method: 'POST',
				body: JSON.stringify(payload),
				requiresAuth: false,
			}
		);

		if (response.status !== 201) {
			throw new Error(
				`Failed to fetch suggestions: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		const validatedData = SuggestionsResponseSchema.parse(data);

		return validatedData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Error fetching objective suggestions: ${error.message}`
			);
		}
		throw new Error(
			'Unknown error occurred while fetching objective suggestions'
		);
	}
}

type EventData = {
	response?: string;
	tokenNumber?: number;
};

type GeneratePetitionContentParams = {
	contentInput: string;
	responseLanguage: string;
	title: string;
	goal: string;
	category: string;
	onData?: (data: EventData) => void;
	onEvent?: (event: string) => void;
	onId?: (id: string) => void;
	onComplete?: () => void;
	onError?: (error: Error) => void;
};

export async function generatePetitionContent(
	params: GeneratePetitionContentParams
): Promise<void> {
	const {
		contentInput = '',
		responseLanguage,
		title,
		goal,
		category,
		onData,
		onEvent,
		onId,
		onComplete,
		onError,
	} = params;

	try {
		const searchParams = new URLSearchParams({
			contentInput: encodeURIComponent(
				contentInput.length !== 0 ? contentInput : '<p></p>'
			),
			responseLanguage: encodeURIComponent(responseLanguage),
			title: encodeURIComponent(title),
			goal: encodeURIComponent(goal),
			category: encodeURIComponent(category),
		});

		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_BASE_URL
			}/openai/stream-reformulate?${searchParams.toString()}`,
			{
				method: 'GET',
				headers: {
					'Content-Encoding': 'none',
					Connection: 'keep-alive',
					'Content-Type': 'application/json',
					Accept: 'text/event-stream',
					'Cache-Control': 'no-cache',
				},
			}
		);

		if (response.status !== 200) {
			throw new Error(
				`Failed to fetch petition content: ${response.status} ${response.statusText}`
			);
		}

		if (!response.body) {
			throw new Error('No response body available');
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				onComplete?.();
				break;
			}

			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split('\n');

			for (const line of lines) {
				if (line.trim() === '') continue;

				if (line.startsWith('event:')) {
					const event = line.substring(6).trim();
					onEvent?.(event);
				} else if (line.startsWith('id:')) {
					const id = line.substring(3).trim();
					onId?.(id);
				} else if (line.startsWith('data:')) {
					const data = line.substring(5).trim();
					const parsedData: EventData = JSON.parse(data);
					onData?.(parsedData);
				}
			}
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? `Error generating petition content: ${error.message}`
				: 'Unknown error occurred while generating petition content';

		const errorObj = new Error(errorMessage);
		onError?.(errorObj);
		throw errorObj;
	}
}

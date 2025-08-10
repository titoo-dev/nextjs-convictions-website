import { TitleSuggestionPayload } from '@/schemas/title-suggestion-payload';
import { ObjectiveSuggestionPayload } from '@/schemas/objective-suggestion-payload';
import {
	SuggestionsResponse,
	SuggestionsResponseSchema,
} from '@/schemas/suggestions-response';

type SurveyDescriptionSuggestionPayload = {
	question: string;
	responseLanguage: string;
};

export async function getSurveyDescriptionSuggestions(
	payload: SurveyDescriptionSuggestionPayload
): Promise<SuggestionsResponse> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/survey-description`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);

		if (response.status !== 201) {
			throw new Error(
				`Failed to fetch survey description suggestions: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		const validatedData = SuggestionsResponseSchema.parse(data);

		return validatedData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Error fetching survey description suggestions: ${error.message}`
			);
		}
		throw new Error(
			'Unknown error occurred while fetching survey description suggestions'
		);
	}
}

export async function getTitleSuggestions(
	payload: TitleSuggestionPayload
): Promise<SuggestionsResponse> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/title`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);

		if (response.status !== 201) {
			throw new Error(
				`Failed to fetch suggestions: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		// Validate response against schema
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
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/goal`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
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

// Authentication utilities
import { getTokens, refreshAccessToken } from './cookies-storage';

interface ApiOptions extends RequestInit {
	requireAuth?: boolean;
}

export async function apiCall(
	url: string,
	options: ApiOptions = {}
): Promise<Response> {
	const { requireAuth = true, ...fetchOptions } = options;

	if (!requireAuth) {
		return fetch(url, fetchOptions);
	}

	const tokens = await getTokens();
	if (!tokens) {
		throw new Error('No authentication tokens available');
	}

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${tokens.accessToken}`,
		...fetchOptions.headers,
	};

	try {
		const response = await fetch(url, {
			...fetchOptions,
			headers,
		});

		if (response.status === 401) {
			const refreshedTokens = await refreshAccessToken();
			if (refreshedTokens) {
				const retryResponse = await fetch(url, {
					...fetchOptions,
					headers: {
						...headers,
						Authorization: `Bearer ${refreshedTokens.accessToken}`,
					},
				});
				return retryResponse;
			}
		}

		return response;
	} catch (error) {
		throw new Error(`API call failed: ${error}`);
	}
}

export async function authenticatedFetch(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	return apiCall(url, { ...options, requireAuth: true });
}

export async function publicFetch(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	return apiCall(url, { ...options, requireAuth: false });
}

'use server';

import { cookies } from 'next/headers';
import { authResponseSchema } from '@/schemas/auth-response';

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
	expiresAt?: string;
};

// Configuration des durées (en millisecondes)
const ACCESS_TOKEN_LIFETIME = 60 * 60 * 1000; // 1 heure au lieu de 15 minutes
const REFRESH_TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000; // 7 jours
const REFRESH_BUFFER_TIME = 5 * 60 * 1000; // 5 minutes avant expiration

export async function saveTokens(tokens: AuthTokens): Promise<void> {
	try {
		const cookieStore = await cookies();
		const now = new Date();
		const defaultExpiresAt = new Date(
			now.getTime() + ACCESS_TOKEN_LIFETIME
		);

		cookieStore.set('access-token', tokens.accessToken, {
			expires: tokens.expiresAt
				? new Date(tokens.expiresAt)
				: defaultExpiresAt,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});

		const refreshExpiresAt = new Date(
			now.getTime() + REFRESH_TOKEN_LIFETIME
		);
		cookieStore.set('refresh-token', tokens.refreshToken, {
			expires: refreshExpiresAt,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});

		if (tokens.expiresAt) {
			cookieStore.set('token-expires-at', tokens.expiresAt, {
				expires: tokens.expiresAt
					? new Date(tokens.expiresAt)
					: defaultExpiresAt,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
			});
		}
	} catch (error) {
		console.warn('Failed to save auth tokens to cookies:', error);
	}
}

export async function getTokens(): Promise<AuthTokens | null> {
	try {
		const cookieStore = await cookies();

		const accessToken = cookieStore.get('access-token')?.value;
		const refreshToken = cookieStore.get('refresh-token')?.value;
		const expiresAt = cookieStore.get('token-expires-at')?.value;

		if (!accessToken || !refreshToken) {
			return null;
		}

		// Vérifier si le token doit être rafraîchi (5 minutes avant expiration)
		if (expiresAt) {
			const expirationDate = new Date(expiresAt);
			const now = new Date();

			if (
				now.getTime() >=
				expirationDate.getTime() - REFRESH_BUFFER_TIME
			) {
				console.log('Token will expire soon, attempting refresh...');
				const refreshedTokens = await refreshAccessToken();
				if (refreshedTokens) {
					return refreshedTokens;
				}
				// Si le refresh échoue, on continue avec le token actuel
				// Il sera géré dans makeAuthenticatedRequest si vraiment expiré
				console.warn(
					'Token refresh failed, continuing with current token'
				);
			}
		}

		return {
			accessToken,
			refreshToken,
			expiresAt,
		};
	} catch (error) {
		console.warn('Failed to load auth tokens from cookies:', error);
		// Ne pas effacer les tokens ici, laisser une chance à l'API de les utiliser
		return null;
	}
}

export async function getAccessToken(): Promise<string | null> {
	const tokens = await getTokens();
	return tokens?.accessToken || null;
}

export async function getRefreshToken(): Promise<string | null> {
	const tokens = await getTokens();
	return tokens?.refreshToken || null;
}

export async function clearTokens(): Promise<void> {
	try {
		const cookieStore = await cookies();
		cookieStore.delete('access-token');
		cookieStore.delete('refresh-token');
		cookieStore.delete('token-expires-at');
	} catch (error) {
		console.warn('Failed to clear auth tokens from cookies:', error);
	}
}

export async function isAuthenticated(): Promise<boolean> {
	const tokens = await getTokens();
	return tokens !== null;
}

export async function updateAccessToken(
	accessToken: string,
	expiresAt?: string
): Promise<void> {
	try {
		const cookieStore = await cookies();
		const now = new Date();
		const expiration = expiresAt
			? new Date(expiresAt)
			: new Date(now.getTime() + ACCESS_TOKEN_LIFETIME);

		cookieStore.set('access-token', accessToken, {
			expires: expiration,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});

		if (expiresAt) {
			cookieStore.set('token-expires-at', expiresAt, {
				expires: expiration,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
			});
		}
	} catch (error) {
		console.warn('Failed to update access token in cookies:', error);
	}
}

export async function refreshAccessToken(): Promise<AuthTokens | null> {
	try {
		const cookieStore = await cookies();
		const refreshToken = cookieStore.get('refresh-token')?.value;

		if (!refreshToken) {
			console.warn('No refresh token available');
			return null;
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refreshToken`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${refreshToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

		if (!response.ok) {
			console.warn(
				'Failed to refresh token:',
				response.status,
				response.statusText
			);
			// Seulement effacer les tokens si c'est une erreur 401/403 (token invalide)
			if (response.status === 401 || response.status === 403) {
				await clearTokens();
			}
			return null;
		}

		const data = await response.json();
		const validatedResponse = authResponseSchema.parse(data);

		if (
			!validatedResponse.access_token ||
			!validatedResponse.refresh_token
		) {
			console.warn('Invalid response from refresh token endpoint');
			await clearTokens();
			return null;
		}

		// Utiliser la durée par défaut de 1 heure pour l'expiration
		const now = new Date();
		const defaultExpiresAt = new Date(
			now.getTime() + ACCESS_TOKEN_LIFETIME
		).toISOString();

		const newTokens: AuthTokens = {
			accessToken: validatedResponse.access_token,
			refreshToken: validatedResponse.refresh_token,
			expiresAt: defaultExpiresAt,
		};

		await saveTokens(newTokens);
		console.log('Access token refreshed successfully');
		return newTokens;
	} catch (error) {
		console.warn('Error refreshing access token:', error);
		// Ne pas effacer automatiquement les tokens en cas d'erreur réseau
		return null;
	}
}

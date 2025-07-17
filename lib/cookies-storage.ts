'use server';

import { cookies } from 'next/headers';

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
	expiresAt?: string; // ISO string for token expiration
};

export async function saveTokens(tokens: AuthTokens): Promise<void> {
	try {
		const cookieStore = await cookies();
		const now = new Date();
		const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes from now

		// Set access token cookie
		cookieStore.set('access-token', tokens.accessToken, {
			expires: tokens.expiresAt ? new Date(tokens.expiresAt) : expiresAt,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});

		// Set refresh token cookie (longer expiration)
		const refreshExpiresAt = new Date(
			now.getTime() + 7 * 24 * 60 * 60 * 1000
		); // 7 days
		cookieStore.set('refresh-token', tokens.refreshToken, {
			expires: refreshExpiresAt,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});

		// Store expiration time
		if (tokens.expiresAt) {
			cookieStore.set('token-expires-at', tokens.expiresAt, {
				expires: tokens.expiresAt
					? new Date(tokens.expiresAt)
					: expiresAt,
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

		// Check if tokens are expired
		if (expiresAt) {
			const expirationDate = new Date(expiresAt);
			const now = new Date();

			if (now >= expirationDate) {
				// Tokens expired, try to refresh them
				const refreshedTokens = await refreshAccessToken();
				if (refreshedTokens) {
					return refreshedTokens;
				}
				// If refresh failed, clear tokens and return null
				await clearTokens();
				return null;
			}
		}

		return {
			accessToken,
			refreshToken,
			expiresAt,
		};
	} catch (error) {
		console.warn('Failed to load auth tokens from cookies:', error);
		await clearTokens();
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
			: new Date(now.getTime() + 15 * 60 * 1000);

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
		const refreshToken = await getRefreshToken();

		if (!refreshToken) {
			console.warn('No refresh token available');
			return null;
		}

		const response = await fetch('/auth/refreshToken', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${refreshToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (response.status !== 200) {
			console.warn('Failed to refresh token:', response.statusText);
			await clearTokens();
			return null;
		}

		const data = await response.json();

		if (!data.accessToken || !data.refreshToken) {
			console.warn('Invalid response from refresh token endpoint');
			await clearTokens();
			return null;
		}

		// Calculate expiration if not provided by the API
		const now = new Date();
		const defaultExpiresAt = new Date(
			now.getTime() + 15 * 60 * 1000
		).toISOString(); // 15 minutes

		const newTokens: AuthTokens = {
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
			expiresAt: data.expiresAt || defaultExpiresAt,
		};

		await saveTokens(newTokens);
		return newTokens;
	} catch (error) {
		console.warn('Error refreshing access token:', error);
		await clearTokens();
		return null;
	}
}

'use server';

import { cookies } from 'next/headers';

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
	expiresAt?: string;
};

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
	path: '/',
};

export async function saveTokens(tokens: AuthTokens): Promise<void> {
	try {
		const cookieStore = await cookies();
		const expiresAt = tokens.expiresAt
			? new Date(tokens.expiresAt)
			: new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

		cookieStore.set('access-token', tokens.accessToken, {
			...COOKIE_OPTIONS,
			expires: expiresAt,
		});

		cookieStore.set('refresh-token', tokens.refreshToken, {
			...COOKIE_OPTIONS,
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
		});

		if (tokens.expiresAt) {
			cookieStore.set('token-expires-at', tokens.expiresAt, {
				...COOKIE_OPTIONS,
				expires: expiresAt,
			});
		}
	} catch (error) {
		console.warn('Failed to save auth tokens:', error);
	}
}

export async function getTokens(): Promise<AuthTokens | null> {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get('access-token')?.value;
		const refreshToken = cookieStore.get('refresh-token')?.value;
		const expiresAt = cookieStore.get('token-expires-at')?.value;

		if (!refreshToken) {
			return null;
		}

		// Check if access token is expired
		if (expiresAt && new Date() >= new Date(expiresAt)) {
			const refreshedTokens = await refreshAccessToken();
			return refreshedTokens;
		}

		return { accessToken: accessToken || '', refreshToken, expiresAt };
	} catch (error) {
		console.warn('Failed to get auth tokens:', error);
		return null;
	}
}

export async function getAccessToken(): Promise<string | null> {
	const tokens = await getTokens();
	return tokens?.accessToken || null;
}

export async function clearTokens(): Promise<void> {
	try {
		const cookieStore = await cookies();
		cookieStore.delete('access-token');
		cookieStore.delete('refresh-token');
		cookieStore.delete('token-expires-at');
	} catch (error) {
		console.warn('Failed to clear auth tokens:', error);
	}
}

export async function isAuthenticated(): Promise<boolean> {
	const tokens = await getTokens();
	return tokens !== null;
}

export async function refreshAccessToken(): Promise<AuthTokens | null> {
	try {
		const cookieStore = await cookies();
		const refreshToken = cookieStore.get('refresh-token')?.value;

		if (!refreshToken) {
			await clearTokens();
			return null;
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refreshToken`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${refreshToken}`,
				},
			}
		);

		console.log('Refresh token response:', response);

		if (response.status !== 201) {
			await clearTokens();
			return null;
		}

		const data = await response.json();

		if (!data.access_token || !data.refresh_token) {
			await clearTokens();
			return null;
		}

		const newTokens: AuthTokens = {
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			expiresAt: data.expires_at,
		};

		await saveTokens(newTokens);
		return newTokens;
	} catch (error) {
		console.warn('Failed to refresh token:', error);
		await clearTokens();
		return null;
	}
}

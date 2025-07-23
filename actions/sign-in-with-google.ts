'use server';

import { saveTokens } from '@/lib/cookies-storage';
import { generateToken } from '@/lib/token';
import { AuthResponse } from '@/schemas/auth-response';
import { revalidatePath } from 'next/cache';

type SignInWithGoogleParams = {
	email: string;
	picture: string;
	displayName: string;
	lang?: string;
};

export async function signInWithGoogle(params: SignInWithGoogleParams) {
	try {
		const { email, picture, displayName, lang = 'en' } = params;

		// Generate bearer token
		const token = await generateToken();

		// Create request body from parameters
		const requestBody = {
			email,
			picture,
			displayName,
			lang,
		};

		// Make POST request to /auth/signInWithGoogle
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signInWithGoogle`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			}
		);

		const responseData: AuthResponse = await response.json();

		if (responseData.access_token && responseData.refresh_token) {
			await saveTokens({
				accessToken: responseData.access_token,
				refreshToken: responseData.refresh_token,
			});
		}

		revalidatePath('/');

		return responseData;
	} catch (error) {
		console.error('Google sign-in failed:', error);

		// You can handle different error types here
		if (error instanceof Error) {
			throw new Error(`Sign-in failed: ${error.message}`);
		}

		throw new Error('An unexpected error occurred during sign-in');
	}
}

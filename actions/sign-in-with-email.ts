'use server';

import { saveTokens } from '@/lib/cookies-storage';
import {
	signInWithEmailRequestSchema,
	type SignInWithEmailRequest,
} from '@/schemas/signin-with-email-request';
import {
	signInWithEmailResponseSchema,
	type SignInWithEmailResponse,
} from '@/schemas/signin-with-email-response';
import { revalidatePath } from 'next/cache';

export async function signInWithEmail(formData: FormData): Promise<{
	success: boolean;
	data?: SignInWithEmailResponse;
	error?: string;
}> {
	try {
		// Extract form data
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Validate request data
		const validatedData: SignInWithEmailRequest =
			signInWithEmailRequestSchema.parse({
				email,
				password,
			});

		// Make API call to sign in endpoint
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(validatedData),
			}
		);

		if (response.status !== 201) {
			throw new Error(`Sign in failed: ${response.statusText}`);
		}

		const responseData = await response.json();

		// Validate response data
		const validatedResponse: SignInWithEmailResponse =
			signInWithEmailResponseSchema.parse(responseData);

		await saveTokens({
			accessToken: validatedResponse.access_token,
			refreshToken: validatedResponse.refresh_token,
		});

		revalidatePath('/');

		return { success: true, data: validatedResponse };
	} catch (error) {
		console.error('Sign in error:', error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'An unexpected error occurred',
		};
	}
}

'use server';

import { saveTokens } from '@/lib/cookies-storage';
import { generateToken } from '@/lib/token';
import { AuthResponse } from '@/schemas/auth-response';
import { VerifyEmailPayload } from '@/schemas/verify-email-payload';
import { revalidatePath } from 'next/cache';

type VerifyEmailResult = {
	success: boolean;
	error?: string;
};

export async function verifyEmail(
	payload: VerifyEmailPayload
): Promise<VerifyEmailResult> {
	try {
		const token = await generateToken();

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verifyEmail`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			}
		);

		if (response.status !== 201) {
			return {
				success: false,
				error: `Email verification failed with status ${response.status}`,
			};
		}

		const responseData: AuthResponse = await response.json();

		if (responseData.access_token && responseData.refresh_token) {
			await saveTokens({
				accessToken: responseData.access_token,
				refreshToken: responseData.refresh_token,
			});
		}

		revalidatePath('/');

		return {
			success: true,
		};
	} catch (error) {
		console.error('Email verification failed:', error);

		if (error instanceof Error) {
			throw new Error(`Verification failed: ${error.message}`);
		}

		throw new Error('An unexpected error occurred during verification');
	}
}

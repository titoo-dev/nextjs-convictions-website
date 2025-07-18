'use server';

import {
	signPetitionRequestSchema,
	type SignPetitionRequest,
} from '@/schemas/sign-petition-request';
import {
	signPetitionResponseSchema,
	type SignPetitionResponse,
} from '@/schemas/sign-petition-response';
import { getAccessToken } from '@/lib/cookies-storage';

type ActionResult = {
	success: boolean;
	data?: SignPetitionResponse;
	error?: string;
};

export async function signPetition(
	request: SignPetitionRequest
): Promise<ActionResult> {
	try {
		// Get access token
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return {
				success: false,
				error: 'Authentication required',
			};
		}

		// Validate request data
		const validatedData = signPetitionRequestSchema.parse(request);

		// Make API call with bearer token
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/sign`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(validatedData),
			}
		);

		if (response.status !== 201) {
			return {
				success: false,
				error: `Request failed with status ${response.status}`,
			};
		}

		const responseData = await response.json();

		// Validate response data
		const validatedResponse =
			signPetitionResponseSchema.parse(responseData);

		return {
			success: true,
			data: validatedResponse,
		};
	} catch (error) {
		console.error('Error signing petition:', error);

		if (error instanceof Error) {
			return {
				success: false,
				error: error.message,
			};
		}

		return {
			success: false,
			error: 'An unexpected error occurred',
		};
	}
}

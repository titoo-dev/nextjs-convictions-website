'use server';

import {
	signPetitionRequestSchema,
	type SignPetitionRequest,
} from '@/schemas/sign-petition-request';
import {
	signPetitionResponseSchema,
	type SignPetitionResponse,
} from '@/schemas/sign-petition-response';
import { makeAuthenticatedRequest } from '@/lib/api';

type ActionResult = {
	success: boolean;
	error?: string;
	data?: SignPetitionResponse;
};

export async function signPetition(
	request: SignPetitionRequest
): Promise<ActionResult> {
	try {
		const validatedData = signPetitionRequestSchema.parse(request);

		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/sign`,
			{
				method: 'POST',
				body: JSON.stringify(validatedData),
				requiresAuth: true,
			}
		);

		if (response.status !== 201) {
			return {
				success: false,
				error: `Request failed with status ${response.status}`,
			};
		}

		const responseData = await response.json();
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

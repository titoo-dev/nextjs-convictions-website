'use server';

import {
	signPublicPetitionRequestSchema,
	type SignPublicPetitionRequest,
} from '@/schemas/sign-public-petition-request';
import {
	signPublicPetitionResponseSchema,
	type SignPublicPetitionResponse,
} from '@/schemas/sign-public-petition-response';
import { revalidatePath } from 'next/cache';

type ActionResult = {
	success: boolean;
	data?: SignPublicPetitionResponse;
	error?: string;
};

export async function signPublicPetition(
	request: SignPublicPetitionRequest
): Promise<ActionResult> {
	try {
		// Validate request data
		const validatedData = signPublicPetitionRequestSchema.parse(request);

		// Make API call
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/public/sign-by-anonymous`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(validatedData),
			}
		);

		if (!response.ok) {
			return {
				success: false,
				error: `Request failed with status ${response.status}`,
			};
		}

		const responseData = await response.json();

		// Validate response data
		const validatedResponse =
			signPublicPetitionResponseSchema.parse(responseData);

		revalidatePath('/');

		return {
			success: true,
			data: validatedResponse,
		};
	} catch (error) {
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

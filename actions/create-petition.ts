'use server';
import { makeFormDataRequest } from '@/lib/api';
import {
	CreatePetitionRequest,
	createPetitionRequestSchema,
} from '@/schemas/create-petition-request';
import {
	createPetitionResponseSchema,
	type CreatePetitionResponse,
} from '@/schemas/create-petition-response';

type ActionResult = {
	success: boolean;
	data?: CreatePetitionResponse;
	error?: string;
};

type CreatePetitionParams = {
	data: CreatePetitionRequest;
	picture?: File | null;
};

export async function createPetition(
	params: CreatePetitionParams
): Promise<ActionResult | null> {
	try {
		// Validate form data (excluding file for initial validation)
		const validatedData = createPetitionRequestSchema.parse(params.data);

		const apiFormData = new FormData();

		// Append all validated fields
		Object.entries(validatedData).forEach(([key, value]) => {
			if (value !== undefined && value !== '') {
				apiFormData.append(key, String(value));
			}
		});

		// Append file if present
		if (params.picture && params.picture.size > 0) {
			apiFormData.append('picture', params.picture);
		}

		// Make API request using the new makeFormDataRequest function
		const response = await makeFormDataRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition`,
			apiFormData,
			{
				method: 'POST',
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

		// Validate response data
		const validatedResponse =
			createPetitionResponseSchema.parse(responseData);

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

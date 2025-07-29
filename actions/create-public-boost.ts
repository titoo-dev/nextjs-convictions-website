'use server';

import {
	createpublicBoostRequestSchema,
	type CreatePublicBoostRequest,
} from '@/schemas/create-public-boost-request';
import {
	CreatePublicBoostResponse,
	createPublicBoostResponseSchema,
} from '@/schemas/create-public-boost-response';
import { cookies } from 'next/headers';

type ActionResult = {
	success: boolean;
	data?: CreatePublicBoostResponse;
	error?: string;
};

export async function createPublicBoost(
	formData: FormData
): Promise<ActionResult> {
	try {
		// Extract data from FormData
		const email = formData.get('email') as string;
		const type = formData.get('type') as string;
		const petitionId = formData.get('petitionId') as string;

		// Create request object
		const requestData: CreatePublicBoostRequest = {
			email: email.trim(),
			type: type as CreatePublicBoostRequest['type'],
			petitionId: petitionId,
		};

		// Validate request data
		const validatedData = createpublicBoostRequestSchema.parse(requestData);

		// Make API request
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/boost/public/create`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
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
			createPublicBoostResponseSchema.parse(responseData);

		// Store the boost ID in a cookie for later use
		const cookieStore = await cookies();
		cookieStore.set('boost-id', validatedResponse.id, {
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
		});

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

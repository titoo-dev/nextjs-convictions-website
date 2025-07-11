'use server';

import {
	createPublicDonationRequestSchema,
} from '@/schemas/create-public-donation-request';
import {
	createPublicDonationRequestSchema as responseSchema,
	type CreatePublicDonationRequest as CreatePublicDonationResponse,
} from '@/schemas/create-public-donation-response';

type ActionResult = {
	success: boolean;
	data?: CreatePublicDonationResponse;
	error?: string;
};

export async function createPublicDonation(
	formData: FormData
): Promise<ActionResult> {
	try {
		// Extract and validate form data
		const amount = Number(formData.get('amount'));

		const validatedData = createPublicDonationRequestSchema.parse({
			amount,
		});

		// Make API request
		const response = await fetch(
			`${process.env.API_BASE_URL}/donation/public/create`,
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
		const validatedResponse = responseSchema.parse(responseData);

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

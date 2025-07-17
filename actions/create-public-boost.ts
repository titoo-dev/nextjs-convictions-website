'use server';

import {
	createBoostSchema,
	type CreateBoost,
} from '@/schemas/create-public-boost';

type ActionResult = {
	success: boolean;
	data?: CreateBoost;
	error?: string;
};

export async function createPublicBoost(
	formData: FormData
): Promise<ActionResult> {
	try {
		// Extract and validate form data
		const type = formData.get('type') as string;
		const petitionId = formData.get('petitionId') as string;
		const email = formData.get('email') as string;

		const validatedData = createBoostSchema.parse({
			type,
			petitionId,
			email,
		});

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
		const validatedResponse = createBoostSchema.parse(responseData);

		console.log('Boost created successfully:', validatedResponse);

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

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
		// Extract data from FormData
		const email = formData.get('email') as string;
		const type = formData.get('type') as string;
		const petitionId = formData.get('petitionId') as string;

		// Validate required fields
		if (!email?.trim()) {
			return {
				success: false,
				error: 'Email is required',
			};
		}

		if (!type?.trim()) {
			return {
				success: false,
				error: 'Boost type is required',
			};
		}

		if (!petitionId?.trim()) {
			return {
				success: false,
				error: 'Petition ID is required',
			};
		}

		// Create request object
		const requestData: CreateBoost = {
			email: email.trim(),
			type: type as CreateBoost['type'],
			petitionId: petitionId,
		};

		// Validate request data
		const validatedData = createBoostSchema.parse(requestData);

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

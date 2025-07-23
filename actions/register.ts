'use server';

import {
	registerPayloadSchema,
	type RegisterPayload,
} from '@/schemas/register-payload';

type RegisterResult = {
	success: boolean;
	error?: string;
};

export async function registerUser(
	payload: RegisterPayload
): Promise<RegisterResult> {
	try {
		const validatedData = registerPayloadSchema.parse(payload);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`,
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
				error: `Registration failed with status ${response.status}`,
			};
		}

		return {
			success: true,
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
			error: 'An unexpected error occurred during registration',
		};
	}
}

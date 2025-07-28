'use server';

import {
	CreateSurveyPayload,
	createSurveyPayloadSchema,
} from '../schemas/create-survey-payload';
import { getAccessToken } from '../lib/cookies-storage';

export async function createSurvey(payload: CreateSurveyPayload) {
	try {
		const validatedPayload = createSurveyPayloadSchema.parse(payload);

		const accessToken = await getAccessToken();

		if (!accessToken) {
			throw new Error('Authentication required');
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/survey`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(validatedPayload),
			}
		);

		if (response.status !== 201) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || 'Failed to create survey');
		}

		const data = await response.json();
		return { success: true, data };
	} catch (error) {
		console.error('Error creating survey:', error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Failed to create survey',
		};
	}
}

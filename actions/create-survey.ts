'use server';

import {
	CreateSurveyPayload,
	createSurveyPayloadSchema,
} from '../schemas/create-survey-payload';
import { getAccessToken } from '../lib/cookies-storage';
import { createSurveyResponseSchema } from '@/schemas/create-survey-response';

export async function createSurvey(payload: CreateSurveyPayload) {
	try {
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return {
				success: false,
				error: 'Authentication required',
			};
		}

		const validatedPayload = createSurveyPayloadSchema.parse(payload);

		const apiFormData = new FormData();

		Object.entries(validatedPayload).forEach(([key, value]) => {
			if (key === 'picture') {
				if (value && value instanceof File && value.size > 0) {
					apiFormData.append('picture', value);
				}
			} else if (key === 'options') {
				if (Array.isArray(value)) {
					apiFormData.append('options', value.join('&'));
				}
			} else if (value !== undefined && value !== '') {
				apiFormData.append(key, String(value));
			}
		});

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/survey`,
			{
				method: 'POST',
				body: apiFormData,
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
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
			createSurveyResponseSchema.parse(responseData);

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

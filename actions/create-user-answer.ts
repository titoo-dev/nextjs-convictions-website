'use server';

import {
	UserAnswerPayload,
	UserAnswerPayloadSchema,
} from '@/schemas/user-answer-payload';
import { getAccessToken } from '@/lib/cookies-storage';
import { revalidatePath } from 'next/cache';

export async function createUserAnswer(payload: UserAnswerPayload) {
	try {
		const validatedPayload = UserAnswerPayloadSchema.parse(payload);
		const accessToken = await getAccessToken();

		if (!accessToken) {
			throw new Error('Authentication required');
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/survey/user-answer`,
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
			throw new Error(errorData.message || 'Failed to submit answer');
		}

		const data = await response.json();

		revalidatePath(`/petition/[slug]/[id]`, 'page');

		return { success: true, data };
	} catch (error) {
		console.error('Error submitting user answer:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

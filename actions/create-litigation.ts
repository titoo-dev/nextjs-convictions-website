'use server';

import {
	litigationPayloadSchema,
	type LitigationPayload,
} from '@/schemas/litigation-payload';
import {
	litigationResponseSchema,
	type LitigationResponse,
} from '@/schemas/litigation-response';
import { getAccessToken } from '@/lib/cookies-storage';

export async function createLitigation(
	payload: LitigationPayload
): Promise<LitigationResponse> {
	// Validate payload using Zod schema
	const parseResult = litigationPayloadSchema.safeParse(payload);
	if (!parseResult.success) {
		throw new Error('Invalid litigation payload');
	}

	const accessToken = await getAccessToken();
	if (!accessToken) {
		throw new Error('Authentication required');
	}

	const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/create-litigation`;

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(payload),
	});

	if (response.status !== 201) {
		let errorMsg = 'Failed to submit litigation';
		try {
			const errorData = await response.json();
			if (typeof errorData?.message === 'string') {
				errorMsg = errorData.message;
			}
		} catch {
			// Ignore JSON parse errors
		}
		throw new Error(errorMsg);
	}

	const data = await response.json();

	const result = litigationResponseSchema.safeParse(data);
	if (!result.success) {
		throw new Error('Invalid response from litigation API');
	}

	return result.data;
}

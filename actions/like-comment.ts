'use server';

import { makeAuthenticatedRequest } from '@/lib/api';

type LikeCommentPayload = {
	comment_id: string;
};

type LikeCommentResult = {
	success: boolean;
	error?: string;
};

export async function likeComment(
	payload: LikeCommentPayload
): Promise<LikeCommentResult> {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/like`,
			{
				method: 'POST',
				body: JSON.stringify(payload),
				requiresAuth: true,
			}
		);

		if (response.status !== 201) {
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				error:
					errorData.message ||
					`Request failed with status ${response.status}`,
			};
		}

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'An unexpected error occurred',
		};
	}
}

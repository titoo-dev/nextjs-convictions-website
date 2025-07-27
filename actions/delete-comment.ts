'use server';

import { makeAuthenticatedRequest } from '@/lib/api';

type DeleteCommentPayload = {
	comment_id: string;
};

type DeleteCommentResult = {
	success: boolean;
	error?: string;
};

export async function deleteComment(
	payload: DeleteCommentPayload
): Promise<DeleteCommentResult> {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/delete`,
			{
				method: 'DELETE',
				body: JSON.stringify(payload),
				requiresAuth: true,
			}
		);

		if (response.status !== 200) {
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

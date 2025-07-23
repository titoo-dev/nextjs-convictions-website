'use server';

import { revalidatePath } from 'next/cache';
import { getAccessToken } from '../lib/cookies-storage';

type DeleteCommentParams = {
	commentId: string;
};

type DeleteCommentResult =
	| { success: true }
	| { success: false; error: string };

export async function deleteComment({
	commentId,
}: DeleteCommentParams): Promise<DeleteCommentResult> {
	if (!commentId || typeof commentId !== 'string') {
		return { success: false, error: 'Invalid comment ID' };
	}

	const accessToken = await getAccessToken();
	if (!accessToken) {
		return { success: false, error: 'Unauthorized' };
	}

	try {
		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_BASE_URL
			}/petition/comment/${encodeURIComponent(commentId)}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status !== 200) {
			return {
				success: false,
				error: 'Failed to delete comment',
			};
		}

		return { success: true };
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

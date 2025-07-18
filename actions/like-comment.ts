'use server';

import { getAccessToken } from '@/lib/cookies-storage';
import { revalidatePath } from 'next/cache';

type LikeCommentResponse = {
	success: boolean;
	message?: string;
};

export async function likeComment(
	commentId: string
): Promise<LikeCommentResponse> {
	try {
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return {
				success: false,
				message: 'Authentication required',
			};
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/likeComment`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					commentId,
				}),
			}
		);

		if (response.status !== 201) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// Revalidate the page to show updated like count
		revalidatePath('/');

		return {
			success: true,
			message: data.message,
		};
	} catch (error) {
		console.error('Error liking comment:', error);
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'Failed to like comment',
		};
	}
}

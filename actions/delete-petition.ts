'use server';

import { makeAuthenticatedRequest } from '@/lib/api';

type DeletePetitionResult = {
	success: boolean;
	message?: string;
	error?: string;
};

export async function deletePetition(
	petitionId: string
): Promise<DeletePetitionResult> {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/${petitionId}`,
			{
				method: 'DELETE',
				requiresAuth: true,
			}
		);

		if (response.status === 200) {
			return {
				success: true,
				message: 'Petition deleted successfully',
			};
		} else {
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				error:
					errorData.message ||
					`Delete failed with status ${response.status}`,
			};
		}
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

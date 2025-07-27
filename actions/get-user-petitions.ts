'use server';

import { makeAuthenticatedRequest } from '@/lib/api';
import { userPetitionSchema, type UserPetition } from '@/schemas/user-petition';

export async function getUserPetitions(
	locale: string
): Promise<UserPetition[]> {
	try {
		const response = await makeAuthenticatedRequest(
			`${
				process.env.NEXT_PUBLIC_API_BASE_URL
			}/petition/my/${locale.toUpperCase()}`,
			{
				method: 'GET',
				requiresAuth: true,
			}
		);

		if (response.status !== 200) {
			console.error(
				'Failed to fetch user petitions:',
				response.statusText
			);
			return [];
		}

		const data = await response.json();

		if (!Array.isArray(data)) {
			console.error('Expected array but got:', typeof data);
			return [];
		}

		const petitions = data.map((item) => userPetitionSchema.parse(item));
		return petitions;
	} catch (error) {
		console.error('Error fetching user petitions:', error);
		return [];
	}
}

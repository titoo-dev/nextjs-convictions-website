'use server';

import { makeAuthenticatedRequest } from '@/lib/api';
import {
	userSignedPetitionSchema,
	type UserSignedPetition,
} from '@/schemas/user-signed-petition';

export async function getUserSignedPetitions(
	locale: string
): Promise<UserSignedPetition[]> {
	try {
		const response = await makeAuthenticatedRequest(
			`${
				process.env.NEXT_PUBLIC_API_BASE_URL
			}/petition/signed/${locale.toUpperCase()}`,
			{
				method: 'GET',
				requiresAuth: true,
			}
		);

		if (response.status !== 200) {
			console.error(
				'Failed to fetch signed petitions:',
				response.statusText
			);
			return [];
		}

		const data = await response.json();

		if (!Array.isArray(data)) {
			console.error('Expected array but got:', typeof data);
			return [];
		}

		const petitions = data.map((item) =>
			userSignedPetitionSchema.parse(item)
		);
		return petitions;
	} catch (error) {
		console.error('Error fetching signed petitions:', error);
		return [];
	}
}

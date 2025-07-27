'use server';

import {
	petitionToUpdateSchema,
	type PetitionToUpdate,
} from '@/schemas/petition-to-update';
import { getAccessToken } from '@/lib/cookies-storage';

export async function getPetitionToUpdate(
	id: string
): Promise<PetitionToUpdate | null> {
	try {
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return null;
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/oneToUpdate/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status !== 200) {
			console.error(
				'Failed to fetch petition to update:',
				response.statusText
			);
			return null;
		}

		const data = await response.json();

		const parsedPetition = petitionToUpdateSchema.parse(data);

		return parsedPetition;
	} catch (error) {
		console.error('Error fetching petition to update:', error);
		return null;
	}
}

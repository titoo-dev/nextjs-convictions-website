'use server';

import {
	PublicPetition,
	PublicPetitionSchema,
} from '../schemas/public-petition';

export type GetUniquePetitionResponse = {
	petition: PublicPetition | null;
};

export type GetUniquePetitionParams = {
	id: string;
	language?: 'FR' | 'EN' | 'ES';
};

type ErrorResponse = {
	statusCode: number;
	message: string;
};

export async function getUniquePublicPetition(
	params: GetUniquePetitionParams
): Promise<GetUniquePetitionResponse> {
	try {
		const { id, language = 'EN' } = params;

		if (!id) {
			console.error('Petition ID is required');
			return { petition: null };
		}

		// Make API request
		const response = await fetch(
			`${process.env.API_BASE_URL}/petition/public/one/${id}/${language}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

		const data = await response.json();

		if (typeof data === 'object' && 'statusCode' in data) {
			const errorResponse = data as ErrorResponse;
			console.error(
				`Error fetching petition: ${errorResponse.message} (Status: ${errorResponse.statusCode})`
			);
			return { petition: null };
		}

		console.log('Fetched petition:', data);

		const validatedPetition = PublicPetitionSchema.parse(data);

		return { petition: validatedPetition };
	} catch (error) {
		console.error('Error fetching unique public petition:', error);

		// Return null petition on error to prevent UI crashes
		return {
			petition: null,
		};
	}
}

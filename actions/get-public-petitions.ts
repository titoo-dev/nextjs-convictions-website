'use server'

import { PublicPetition, PublicPetitionSchema } from '../schemas/public-petition'

export type GetPetitionsResponse = {
    petitions: PublicPetition[]
}

export type GetPetitionsParams = {
    category?: 'ALL' | string,
    language?: 'FR' | 'EN' | 'ES',
}

export async function getPublicPetitions(
    params: GetPetitionsParams,
): Promise<GetPetitionsResponse> {
    try {
        const {
            category = 'ALL',
            language = 'EN',
        } = params

        // Make API request
        const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/public/home/${language}/${category}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

        const data = await response.json()

        const parsedPetitions = PublicPetitionSchema.array().parse(data);

        return { petitions: parsedPetitions };
    } catch (error) {
        console.error('Error fetching public petitions:', error)
        
        // Return empty result on error to prevent UI crashes
        return {
            petitions: [],
        }
    }
}

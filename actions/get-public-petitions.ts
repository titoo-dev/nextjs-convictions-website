'use server'

import { PublicPetition } from '../types/public-petition'

export interface GetPetitionsResponse {
    petitions: PublicPetition[]
}

export interface GetPetitionsParams {
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
			`${process.env.API_BASE_URL}/petition/public/home/${language}/${category}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

        const data = await response.json()

        return { petitions: data };
    } catch (error) {
        console.error('Error fetching public petitions:', error)
        
        // Return empty result on error to prevent UI crashes
        return {
            petitions: [],
        }
    }
}

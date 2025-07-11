import { PublicPetition } from '../schemas/public-petition'

'use server'


export interface GetUniquePetitionResponse {
    petition: PublicPetition | null
}

export interface GetUniquePetitionParams {
    id: string
    language?: 'FR' | 'EN' | 'ES'
}

export async function getUniquePublicPetition(
    params: GetUniquePetitionParams,
): Promise<GetUniquePetitionResponse> {
    try {
        const {
            id,
            language = 'EN',
        } = params

        if (!id) {
            console.error('Petition ID is required')
            return { petition: null }
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
        )

        const data: PublicPetition = await response.json()

        return { petition: data }
    } catch (error) {
        console.error('Error fetching unique public petition:', error)
        
        // Return null petition on error to prevent UI crashes
        return {
            petition: null,
        }
    }
}
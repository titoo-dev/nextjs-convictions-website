'use server'

import { getAccessToken } from '@/lib/cookies-storage';
import { revalidatePath } from 'next/cache';

type DeletePetitionResult = {
    success: boolean;
    error?: string;
}

export async function deletePetition(petitionId: string): Promise<DeletePetitionResult> {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/${petitionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200 && response.status !== 204) {
            console.error('Failed to delete petition:', response.statusText);
            return {
                success: false,
                error: response.statusText
            };
        }

        // Revalidate the user petitions page to reflect the deletion
        revalidatePath('/profile');

        return {
            success: true
        };
    } catch (error) {
        console.error('Error deleting petition:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
}
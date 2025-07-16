'use server'

import { getLocale } from 'next-intl/server';
import { UserPetition, UserPetitionSchema } from '../schemas/user-petition'
import { z } from 'zod'
import { getAccessToken } from '@/lib/cookies-storage';

const UserPetitionsResponseSchema = z.array(UserPetitionSchema)

export async function getUserPetitions(): Promise<UserPetition[] | null> {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const locale = await getLocale()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/my/${locale.toUpperCase()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            console.error('Failed to fetch user petitions:', response.statusText);
            return null;
        }

        const data = await response.json();

        const parsedPetitions = UserPetitionsResponseSchema.parse(data);

        return parsedPetitions;
    } catch (error) {
        console.error('Error fetching user petitions:', error);
        return null;
    }
}
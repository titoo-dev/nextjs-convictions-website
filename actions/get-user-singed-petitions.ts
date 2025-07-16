'use server'

import { getLocale } from 'next-intl/server';
import { UserSignedPetition, UserSignedPetitionSchema } from '../schemas/user-signed-petition'
import { z } from 'zod';
import { getAccessToken } from '@/lib/cookies-storage';


const UserSignedPetitionsResponseSchema = z.array(UserSignedPetitionSchema)

export async function getUserSignedPetitions(): Promise<UserSignedPetition[] | null> {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const locale = await getLocale()

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/signed/${locale.toUpperCase()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            console.error('Failed to fetch user signed petitions:', response.statusText);
            return null;
        }

        const data = await response.json();

        const parsedSignedPetitions = UserSignedPetitionsResponseSchema.parse(data);

        return parsedSignedPetitions;
    } catch (error) {
        console.error('Error fetching user signed petitions:', error);
        return null;
    }
}
'use server'

import { User, userSchema } from '../schemas/user'


export async function getCurrentUser(accessToken: string | null): Promise<User | null> {
    try {
        if (!accessToken) {
            return null;
        }

        const response = await fetch(
            `${process.env.API_BASE_URL}/user`,
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
            console.error('Failed to fetch current user:', response.statusText);
            return null;
        }

        const data = await response.json();

        const parsedUser = userSchema.parse(data);

        return parsedUser;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}
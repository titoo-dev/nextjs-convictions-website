'use server';

import { User, userSchema } from '../schemas/user';
import { makeAuthenticatedRequest } from '../lib/api';

export async function getCurrentUser(): Promise<User | null> {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
			{
				method: 'GET',
				requiresAuth: true,
			}
		);

		if (response.status !== 200) {
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

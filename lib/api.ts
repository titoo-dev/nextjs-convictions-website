import { User } from "../schemas/user";
import { authLocalStorage } from "./local-storage";

// lib/api.ts

/**
 * Fetches the current authenticated user
 * @param accessToken The user's access token
 * @returns The user object or null if not authenticated
 */
export async function fetchCurrentUser(): Promise<User | null> {
	// Use the auth local storage utility to get the access token
	const accessToken =
		typeof window !== 'undefined'
			? authLocalStorage.getAccessToken()
			: null;

	if (!accessToken) {
		return null;
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
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
			throw new Error(`Failed to fetch user: ${response.status}`);
		}

		const data = await response.json();
		return data as User;
	} catch (error) {
		console.error('Error fetching current user:', error);
		throw error;
	}
}
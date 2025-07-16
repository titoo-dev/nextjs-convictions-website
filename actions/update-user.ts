'use server';

import { getAccessToken } from '@/lib/cookies-storage';
import { revalidatePath } from 'next/cache';

type UpdateUserData = {
	name?: string;
	picture?: File;
};

type ActionResult = {
	success: boolean;
	data?: {
		message: string;
	};
	error?: string;
};

export async function updateUser(
	userData: UpdateUserData
): Promise<ActionResult | null> {
	try {
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return null;
		}

		// Check if there's actually data to update
		const hasNameUpdate =
			userData.name !== undefined && userData.name.trim() !== '';
		const hasPictureUpdate = userData.picture && userData.picture.size > 0;

		if (!hasNameUpdate && !hasPictureUpdate) {
			return {
				success: false,
				error: 'No data provided for update',
			};
		}

		// Prepare multipart form data for API request
		const apiFormData = new FormData();

		// Append name if provided and not empty
		if (hasNameUpdate) {
			apiFormData.append('name', userData.name!.trim());
		}

		// Append picture file if provided and has content
		if (hasPictureUpdate) {
			apiFormData.append('picture', userData.picture!);
		}

		// Make API request without Content-Type header (let browser set it for multipart/form-data)
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
			{
				method: 'PATCH',
				body: apiFormData,
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			return {
				success: false,
				error: `Request failed with status ${response.status}: ${errorText}`,
			};
		}

		const responseData = await response.json();

		// Revalidate relevant paths to update cached data
		revalidatePath('/profile');
		revalidatePath('/');

		return {
			success: true,
			data: responseData,
		};
	} catch (error) {
		console.error('Update user error:', error);

		if (error instanceof Error) {
			return {
				success: false,
				error: error.message,
			};
		}

		return {
			success: false,
			error: 'An unexpected error occurred while updating user',
		};
	}
}

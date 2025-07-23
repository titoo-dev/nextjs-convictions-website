'use server';

import { revalidatePath } from 'next/cache';
import { makeAuthenticatedRequest } from '@/lib/api';

export type UpdateUserData = {
	name?: string;
	picture?: File;
};

export type ActionResult = {
	success: boolean;
	error?: string;
	data?: any;
};

export async function updateUser(
	userData: UpdateUserData
): Promise<ActionResult | null> {
	try {
		const hasNameUpdate =
			userData.name !== undefined && userData.name.trim() !== '';
		const hasPictureUpdate = userData.picture && userData.picture.size > 0;

		if (!hasNameUpdate && !hasPictureUpdate) {
			return {
				success: false,
				error: 'No data provided for update',
			};
		}

		const apiFormData = new FormData();

		if (hasNameUpdate) {
			apiFormData.append('name', userData.name!.trim());
		}

		if (hasPictureUpdate) {
			apiFormData.append('picture', userData.picture!);
		}

		const response = await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
			{
				method: 'PATCH',
				body: apiFormData,
				requiresAuth: true,
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

'use server';

import { clearTokens } from '@/lib/cookies-storage';
import { makeAuthenticatedRequest } from '@/lib/api';
import { redirect, RedirectType } from 'next/navigation';

export async function logout(): Promise<void> {
	try {
		await makeAuthenticatedRequest(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
			{
				method: 'POST',
				requiresAuth: true,
			}
		);

		await clearTokens();
	} catch (error) {
		console.error('Error during logout:', error);
		await clearTokens();
	} finally {
		redirect('/', RedirectType.replace);
	}
}

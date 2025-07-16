'use server'

import { clearTokens, getAccessToken } from '@/lib/cookies-storage';
import { redirect, RedirectType } from 'next/navigation';

export async function logout(): Promise<void> {
    try {
        const accessToken = await getAccessToken();

        if (accessToken) {
            // Call the logout endpoint to invalidate the token on the server
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        }

        await clearTokens();
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        // Always redirect to home page after logout attempt
        redirect('/', RedirectType.replace);
    }
}
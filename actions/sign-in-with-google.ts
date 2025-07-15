'use server'

import { generateToken } from '@/lib/token';

type SignInResponse = {
    refresh_token?: string;
    access_token?: string;
};

type SignInWithGoogleParams = {
    email: string;
    picture: string;
    displayName: string;
    lang?: string;
};

export async function signInWithGoogle(params: SignInWithGoogleParams) {
    try {
        const { email, picture, displayName, lang = 'en' } = params;
        
        // Generate bearer token
        const token = await generateToken();
        
        // Create request body from parameters
        const requestBody = {
            email,
            picture,
            displayName,
            lang,
        };

        // Make POST request to /auth/signInWithGoogle
        const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signInWithGoogle`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			}
		);

        const responseData: SignInResponse = await response.json();

        return responseData;
    } catch (error) {
        console.error('Google sign-in failed:', error);
        
        // You can handle different error types here
        if (error instanceof Error) {
            throw new Error(`Sign-in failed: ${error.message}`);
        }
        
        throw new Error('An unexpected error occurred during sign-in');
    }
}

'use server'

import { generateToken } from '@/lib/token';
import { revalidatePath } from 'next/cache';

type SignInResponse = {
    success: boolean;
    refresh_token?: string;
    access_token?: string;
    message?: string;
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

        console.log('Processing sign-in for user:', email);
        
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
        const response = await fetch(`${process.env.API_BASE_URL}/auth/signInWithGoogle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        console.log('Sign-in response:', responseData);

        revalidatePath('/');
        
    } catch (error) {
        console.error('Google sign-in failed:', error);
        
        // You can handle different error types here
        if (error instanceof Error) {
            throw new Error(`Sign-in failed: ${error.message}`);
        }
        
        throw new Error('An unexpected error occurred during sign-in');
    }
}

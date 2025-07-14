'use server'

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // You can add additional logic here such as:
        // - Save user data to your database
        // - Create user session
        // - Log the sign-in event
        
        console.log('User signed in:', user.uid);
        
        // Redirect to dashboard or home page after successful sign-in
        redirect('/dashboard');
        
    } catch (error) {
        console.error('Google sign-in failed:', error);
        
        // You can handle different error types here
        if (error instanceof Error) {
            throw new Error(`Sign-in failed: ${error.message}`);
        }
        
        throw new Error('An unexpected error occurred during sign-in');
    }
}
import { z } from 'zod';

export const signInWithEmailResponseSchema = z.object({
    access_token: z.string().min(1, 'Access token is required'),
    refresh_token: z.string().min(1, 'Refresh token is required'),
});

export type SignInWithEmailResponse = z.infer<typeof signInWithEmailResponseSchema>;
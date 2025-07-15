import { z } from 'zod';

export const signInWithEmailRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(1, 'Password is required')
});

export type SignInWithEmailRequest = z.infer<typeof signInWithEmailRequestSchema>;
import { z } from 'zod';

export const authResponseSchema = z.object({
	refresh_token: z.string().optional(),
	access_token: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

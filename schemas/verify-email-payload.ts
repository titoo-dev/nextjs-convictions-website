import { z } from 'zod';

export const verifyEmailPayloadSchema = z.object({
	email: z.email(),
	code: z.number().int().min(100000).max(999999),
});

export type VerifyEmailPayload = z.infer<typeof verifyEmailPayloadSchema>;

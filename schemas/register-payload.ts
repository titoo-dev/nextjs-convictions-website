import { z } from 'zod';

export const registerPayloadSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
	name: z.string().min(1),
	lang: z.enum(['EN', 'FR', 'ES']),
});

export type RegisterPayload = z.infer<typeof registerPayloadSchema>;

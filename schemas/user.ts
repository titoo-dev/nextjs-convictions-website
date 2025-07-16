import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	email: z.email(),
	name: z.string(),
	connectionType: z.enum(['EMAIL_PASSWORD', 'GOOGLE']),
	role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).default('USER'),
	picture: z
		.union([
			z.string(),
			z.object({
				id: z.string(),
			}),
		])
		.nullable(),
	pictureUrl: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

import { z } from 'zod';

export const signPublicPetitionRequestSchema = z.object({
	petitionId: z.string().min(1, 'Petition ID is required'),
	email: z.email(),
	name: z.string().optional(),
	lang: z
		.enum(['EN', 'FR', 'ES'], {
			message: 'Language must be either EN or FR or ES',
		})
		.optional(),
	comment: z
		.string()
		.max(500, 'Comment must be less than 500 characters')
		.optional(),
	isOptin: z.boolean().default(true),
});

export type SignPublicPetitionRequest = z.infer<
	typeof signPublicPetitionRequestSchema
>;

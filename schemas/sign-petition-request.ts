import { z } from 'zod';

export const signPetitionRequestSchema = z.object({
	petitionId: z.string().min(1, 'Petition ID is required'),
	comment: z
		.string()
		.max(500, 'Comment must be less than 500 characters')
		.optional(),
	isOptin: z.boolean().default(true),
});

export type SignPetitionRequest = z.infer<typeof signPetitionRequestSchema>;

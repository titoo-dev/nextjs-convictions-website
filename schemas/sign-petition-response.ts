import { z } from 'zod';

export const signPetitionResponseSchema = z.object({
	petitionId: z.string(),
	message: z.string(),
});

export type SignPetitionResponse = z.infer<typeof signPetitionResponseSchema>;

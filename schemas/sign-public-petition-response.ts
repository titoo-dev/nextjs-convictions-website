import { z } from 'zod';

export const signPublicPetitionResponseSchema = z.object({
	petitionId: z.string(),
	message: z.string(),
	urlToVerify: z.url(),
});

export type SignPublicPetitionResponse = z.infer<
	typeof signPublicPetitionResponseSchema
>;

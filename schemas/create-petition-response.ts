import { z } from 'zod';

export const createPetitionResponseSchema = z.object({
    message: z.string(),
    id: z.string(),
    urlPetition: z.string(),
});

export type CreatePetitionResponse = z.infer<typeof createPetitionResponseSchema>;
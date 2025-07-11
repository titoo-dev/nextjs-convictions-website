import { z } from 'zod';

export const signPublicPetitionRequestSchema = z.object({
    petitionId: z.string().min(1, 'Petition ID is required'),
    email: z.email(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    lang: z.enum(['EN', 'FR', 'ES'], {
        message: 'Language must be either EN or FR or ES'
    }),
    comment: z.string().max(500, 'Comment must be less than 500 characters').optional(),
    isOptin: z.boolean()
});

export type SignPublicPetitionRequest = z.infer<typeof signPublicPetitionRequestSchema>;

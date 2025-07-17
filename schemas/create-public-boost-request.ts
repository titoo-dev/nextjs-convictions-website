import { z } from 'zod';

export const createpublicBoostRequestSchema = z.object({
	type: z.enum(['BOOST_ORDER', 'BOOST_SEARCH', 'TARGETED_EMAIL']),
	petitionId: z.string().min(1, 'Petition ID is required'),
	email: z.email('Invalid email format'),
});

export type CreatePublicBoostRequest = z.infer<
	typeof createpublicBoostRequestSchema
>;

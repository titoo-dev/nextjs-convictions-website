import { z } from 'zod';

export type BoostType = 'BOOST_ORDER' | 'BOOST_SEARCH' | 'BOOST_EMAIL';

export const createBoostSchema = z.object({
	type: z.enum(['BOOST_ORDER', 'BOOST_SEARCH', 'TARGETED_EMAIL']),
	petitionId: z.string().min(1, 'Petition ID is required'),
	email: z.email('Invalid email format'),
});

export type CreateBoost = z.infer<typeof createBoostSchema>;

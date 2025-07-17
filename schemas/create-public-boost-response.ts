import { z } from 'zod';

export const createPublicBoostResponseSchema = z.object({
	id: z.string().min(1, 'ID is required'),
	url: z.url('Must be a valid URL'),
});

export type CreatePublicBoostResponse = z.infer<
	typeof createPublicBoostResponseSchema
>;

import { z } from 'zod';

export const litigationResponseSchema = z.object({
	message: z.string(),
});

export type LitigationResponse = z.infer<typeof litigationResponseSchema>;

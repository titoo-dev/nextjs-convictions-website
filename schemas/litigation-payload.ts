import { z } from 'zod';

export const litigationPayloadSchema = z.object({
	petitionId: z.string().min(1, { message: 'petitionId is required' }),
	reason: z.string().min(1, { message: 'reason is required' }),
});

export type LitigationPayload = z.infer<typeof litigationPayloadSchema>;

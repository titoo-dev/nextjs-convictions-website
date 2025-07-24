import { z } from 'zod';

export const openaiResponseSchema = z.object({
	url: z.url('Invalid URL format'),
	pictureId: z.string().min(1, 'Picture ID is required'),
	tokenNumber: z.number().min(0, 'Token number must be non-negative'),
});

export type OpenaiResponse = z.infer<typeof openaiResponseSchema>;

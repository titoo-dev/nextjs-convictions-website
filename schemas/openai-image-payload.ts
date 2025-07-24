import { z } from 'zod';

export const openaiImagePayloadSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	goal: z.string().min(1, 'Goal is required'),
	category: z.string().min(1, 'Category is required'),
});

export type OpenaiImagePayload = z.infer<typeof openaiImagePayloadSchema>;

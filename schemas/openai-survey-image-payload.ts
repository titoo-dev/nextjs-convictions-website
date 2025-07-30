import { z } from 'zod';

export const openaiSurveyImagePayloadSchema = z.object({
	question: z.string().min(1, 'Question is required'),
	description: z.string().min(1, 'Description is required'),
});

export type OpenaiSurveyImagePayload = z.infer<
	typeof openaiSurveyImagePayloadSchema
>;

import { z } from 'zod';

export const createSurveyPayloadSchema = z.object({
	question: z.string().min(1, 'Question is required'),
	description: z.string().min(1, 'Description is required'),
	options: z.array(z.string()).min(2, 'At least two options are required'),
	isMultipleChoice: z.boolean(),
	picture: z.instanceof(File).nullable().optional(),
});

export type CreateSurveyPayload = z.infer<typeof createSurveyPayloadSchema>;

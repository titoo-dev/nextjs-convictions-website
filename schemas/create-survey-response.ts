import { z } from 'zod';

const createSurveyResponseSchema = z.object({
	id: z.string(),
	urlSurvey: z.string(),
});

export { createSurveyResponseSchema };

export type CreateSurveyResponse = z.infer<typeof createSurveyResponseSchema>;

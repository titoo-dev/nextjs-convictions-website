import { z } from 'zod';

const SurveyOptionSchema = z.object({
	id: z.string(),
	option: z.string(),
	count: z.number(),
	percentage: z.number(),
});

const SurveySchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	options: z.array(SurveyOptionSchema),
	isMultipleChoice: z.boolean(),
	isAnswered: z.boolean(),
	petitionId: z.string(),
	createdAt: z.string(),
});

export { SurveySchema, SurveyOptionSchema };

export type Survey = z.infer<typeof SurveySchema>;
export type SurveyOption = z.infer<typeof SurveyOptionSchema>;

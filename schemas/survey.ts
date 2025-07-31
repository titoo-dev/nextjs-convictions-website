import { z } from 'zod';

const SurveyOptionSchema = z.object({
	id: z.string(),
	option: z.string(),
	count: z.number(),
	percentage: z.number().nullable(),
});

const SurveySchema = z.object({
	id: z.string(),
	question: z.string(),
	description: z.string(),
	options: z.array(SurveyOptionSchema),
	isMultipleChoice: z.boolean(),
	isAnswered: z.boolean(),
	isMine: z.boolean(),
	surveyUserAnswersTotal: z.number(),
	createdAt: z.string(),
	pictureUrl: z.string().nullable(),
	urlSurvey: z.string(),
	author: z.string(),
	idSeq: z.number(),
});

export { SurveySchema, SurveyOptionSchema };

export type Survey = z.infer<typeof SurveySchema>;
export type SurveyOption = z.infer<typeof SurveyOptionSchema>;

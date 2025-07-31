import { z } from 'zod';

const SurveyOptionSchema = z.object({
	id: z.string(),
	option: z.string(),
	count: z.number(),
	percentage: z.number().nullable(),
});

const AuthorSchema = z.object({
	id: z.string(),
	name: z.string(),
	picture: z.object({
		id: z.string(),
	}),
	pictureUrl: z.string(),
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
	author: AuthorSchema.optional(),
	idSeq: z.number().optional(),
});

export { SurveySchema, SurveyOptionSchema, AuthorSchema };

export type Survey = z.infer<typeof SurveySchema>;
export type SurveyOption = z.infer<typeof SurveyOptionSchema>;
export type Author = z.infer<typeof AuthorSchema>;

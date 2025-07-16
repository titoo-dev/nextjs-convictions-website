import { z } from 'zod';

export const TitleSuggestionPayloadSchema = z.object({
	inputTitle: z.string().min(1),
	category: z.enum([
		'WOMEN_RIGHTS',
		'MEN_RIGHTS',
		'CULTURE',
		'RELIGION',
		'EDUCATION',
		'ENVIRONMENT',
		'RACISM',
		'POLITICS',
		'HANDICAP',
		'HEALTH',
		'TRANSPORT',
		'IMMIGRATION',
		'JUSTICE',
		'ANIMALS',
	]),
	responseLanguage: z.enum(['FR', 'EN', 'ES']),
});

export type TitleSuggestionPayload = z.infer<
	typeof TitleSuggestionPayloadSchema
>;

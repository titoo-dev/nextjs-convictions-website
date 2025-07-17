import { z } from 'zod';

export const ObjectiveSuggestionPayloadSchema = z.object({
	inputGoal: z.string().min(1),
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
	title: z.string().min(1),
});

export type ObjectiveSuggestionPayload = z.infer<
	typeof ObjectiveSuggestionPayloadSchema
>;

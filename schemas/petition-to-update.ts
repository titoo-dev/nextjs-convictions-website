import { z } from 'zod';

export const petitionToUpdateSchema = z.object({
	id: z.string(),
	creationStep: z.number().min(1).max(6),
	category: z.enum([
		'CULTURE',
		'RELIGION',
		'WOMEN_RIGHTS',
		'MEN_RIGHTS',
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
	title: z.string().min(1),
	objective: z.string().min(1),
	destination: z.string().min(1),
	languageOrigin: z.enum(['EN', 'FR', 'ES']),
	contentFr: z.string().optional(),
	mediaType: z.enum(['VIDEO_YOUTUBE', 'PICTURE']),
	videoYoutubeUrl: z.string().url().optional(),
	signatureGoal: z.number().min(1),
	isPublished: z.boolean(),
	publishedAt: z.coerce.date().optional(),
	pictureUrl: z.string().optional(),
	videoUrl: z.string().optional(),
	urlPetition: z.string().optional(),
});

export type PetitionToUpdate = z.infer<typeof petitionToUpdateSchema>;

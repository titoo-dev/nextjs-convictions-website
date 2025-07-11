import { z } from 'zod';

const PictureSchema = z.object({
	id: z.string(),
});

const AuthorSchema = z.object({
	id: z.string(),
	name: z.string(),
	picture: PictureSchema,
	pictureUrl: z.string(),
});

const PublicPetitionSchema = z.object({
	id: z.string(),
	id_seq: z.number(),
	category: z.string(),
	sequenceNumber: z.number(),
	title: z.string(),
	objective: z.string(),
	destination: z.string(),
	mediaType: z.enum(['PICTURE', 'VIDEO_YOUTUBE']),
	videoYoutubeUrl: z.string(),
	signatureGoal: z.number(),
	publishedAt: z.string(),
	isPublished: z.boolean(),
	usersSignedNumber: z.number(),
	offsetMarketing: z.number(),
	isISign: z.boolean(),
	content: z.string(),
	pictureUrl: z.string(),
	videoUrl: z.string(),
	status: z.string(),
	comments: z.array(z.string()),
	author: AuthorSchema,
	isMine: z.boolean(),
	urlPetition: z.string(),
	paramsUrlPetition: z.string(),
	litigationNumber: z.number(),
});

export { PictureSchema, AuthorSchema, PublicPetitionSchema };

export type Picture = z.infer<typeof PictureSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type PublicPetition = z.infer<typeof PublicPetitionSchema>;

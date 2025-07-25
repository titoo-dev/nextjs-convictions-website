import { z } from 'zod';

const PictureSchema = z.object({
	id: z.string(),
});

const AuthorSchema = z.object({
	id: z.string(),
	name: z.string(),
	picture: PictureSchema.nullable(),
	pictureUrl: z.string(),
});

const CommentSchema = z.object({
	id: z.string(),
	content: z.string(),
	likesNumber: z.number(),
	createdAt: z.string(),
	status: z.string(),
	author: AuthorSchema,
	isMine: z.boolean(),
	isLiked: z.boolean(),
});

const PetitionSchema = z.object({
	id: z.string(),
	id_seq: z.number(),
	category: z.string(),
	sequenceNumber: z.number(),
	title: z.string(),
	objective: z.string(),
	destination: z.string().nullable(),
	mediaType: z.enum(['PICTURE', 'VIDEO_YOUTUBE']),
	videoYoutubeUrl: z.string().nullable(),
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
	comments: z.array(CommentSchema),
	author: AuthorSchema,
	isMine: z.boolean(),
	urlPetition: z.string(),
	paramsUrlPetition: z.string(),
	litigationNumber: z.number(),
});

export { PictureSchema, AuthorSchema, CommentSchema, PetitionSchema };

export type Picture = z.infer<typeof PictureSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type PublicPetition = z.infer<typeof PetitionSchema>;

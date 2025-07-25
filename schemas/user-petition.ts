import { z } from 'zod';
import { AuthorSchema, CommentSchema } from './petition';

export const UserPetitionSchema = z.object({
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

export type UserPetition = z.infer<typeof UserPetitionSchema>;

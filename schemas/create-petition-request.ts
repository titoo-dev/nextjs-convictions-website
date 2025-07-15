import { z } from 'zod';

export const createPetitionRequestSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    title: z.string().min(1, 'Title is required'),
    objective: z.string().min(1, 'Objective is required'),
    destination: z.string().min(1, 'Destination is required'),
    content: z.string().min(1, 'Content is required'),
    languageOrigin: z.string().length(2, 'Language origin must be 2 characters'),
    creationStep: z.number().int().min(1).max(6).default(6),
    mediaType: z.string().optional(),
    videoYoutubeUrl: z.url().optional().or(z.literal('')),
    pictureId: z.string().optional(),
    picture: z.any().optional(), // For multipart file upload
    signatureGoal: z.number().int().positive('Signature goal must be positive'),
    publishedAt: z.string().optional(),
    isPublished: z.boolean().default(false),
});

export type CreatePetitionRequest = z.infer<typeof createPetitionRequestSchema>;
import { z } from 'zod';

export const createPublicDonationRequestSchema = z.object({
    amount: z.number().positive('Amount must be a positive number').min(1, 'Minimum donation amount is 1'),
});

export type CreatePublicDonationRequest = z.infer<typeof createPublicDonationRequestSchema>;
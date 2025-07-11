import { z } from 'zod'

export const createPublicDonationRequestSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    donationId: z.string().min(1, 'Donation ID is required'),
    url: z.url('Must be a valid URL')
})

export type CreatePublicDonationRequest = z.infer<typeof createPublicDonationRequestSchema>
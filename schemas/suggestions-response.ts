import { z } from 'zod';

export const SuggestionsResponseSchema = z.object({
	suggestions: z.string().array(),
	tokenNumber: z.number(),
});

export type SuggestionsResponse = z.infer<typeof SuggestionsResponseSchema>;

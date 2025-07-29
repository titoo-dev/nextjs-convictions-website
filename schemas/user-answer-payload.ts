import { z } from 'zod';

export const UserAnswerPayloadSchema = z.object({
	optionSelectedIds: z.array(z.string()),
	surveyId: z.string(),
});

export type UserAnswerPayload = z.infer<typeof UserAnswerPayloadSchema>;

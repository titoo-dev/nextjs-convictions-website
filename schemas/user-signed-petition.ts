import { z } from 'zod';
import { userPetitionSchema } from './user-petition';

export const userSignedPetitionSchema = userPetitionSchema;

export type UserSignedPetition = z.infer<typeof userSignedPetitionSchema>;

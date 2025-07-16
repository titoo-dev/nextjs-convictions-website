import { z } from 'zod';
import { UserPetitionSchema } from './user-petition';

export const UserSignedPetitionSchema = UserPetitionSchema;

export type UserSignedPetition = z.infer<typeof UserSignedPetitionSchema>;
import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    email: z.email(),
    name: z.string(),
    connectionType: z.enum(["EMAIL_PASSWORD", "GOOGLE"]),
    role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).default("USER"),
    picture: z.string().nullable(),
    pictureUrl: z.string(),
});

export type User = z.infer<typeof userSchema>;
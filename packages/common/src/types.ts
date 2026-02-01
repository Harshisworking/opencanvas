import { z } from "zod";
export const CreateRoomSchema = z.object({
    slug: z.string().min(6).max(20),
})

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const SingupUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});
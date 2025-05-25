import { z } from "zod";

export const userUpdateSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(), 
  githubUrl: z.string().url().optional(),
});

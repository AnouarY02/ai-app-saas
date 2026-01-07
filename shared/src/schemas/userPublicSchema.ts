import { z } from 'zod';

export const userPublicSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserPublic = z.infer<typeof userPublicSchema>;

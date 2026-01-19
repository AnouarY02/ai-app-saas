// shared/validators/updateUserRequestSchema.ts
import { z } from 'zod';

export const updateUserRequestSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

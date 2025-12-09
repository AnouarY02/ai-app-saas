import { z } from 'zod';

export const updateProfileRequestSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
});


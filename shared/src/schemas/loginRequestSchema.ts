import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

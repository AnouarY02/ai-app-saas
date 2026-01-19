// shared/validators/signupRequestSchema.ts
import { z } from 'zod';

export const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});

export type SignupRequest = z.infer<typeof signupRequestSchema>;

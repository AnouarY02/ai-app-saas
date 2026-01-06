import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const logoutRequestSchema = z.object({
  token: z.string().min(10)
});

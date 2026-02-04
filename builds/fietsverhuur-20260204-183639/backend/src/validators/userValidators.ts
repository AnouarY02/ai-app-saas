import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(8),
  name: z.string().min(1),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  passwordHash: z.string().min(8).optional(),
  name: z.string().min(1).optional(),
}).partial();
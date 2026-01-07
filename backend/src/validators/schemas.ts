import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateProfileRequestSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export const updateUserSettingsRequestSchema = z.object({
  settings: z.record(z.any()),
});

// Zod schemas for user-related validation
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH, NAME_MAX_LENGTH } from '../constants';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  name: z.string().max(NAME_MAX_LENGTH).optional(),
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export const updateProfileRequestSchema = z.object({
  name: z.string().max(NAME_MAX_LENGTH).optional(),
  password: z.string().min(PASSWORD_MIN_LENGTH).optional(),
});

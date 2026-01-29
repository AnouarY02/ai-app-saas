import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshRequestSchema = z.object({
  token: z.string()
});

export const logoutRequestSchema = z.object({
  token: z.string()
});

export const listUsersRequestSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getUserRequestSchema = z.object({
  id: z.string().uuid()
});

export const updateUserRequestSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  role: z.string().optional()
});

export const partialUpdateUserRequestSchema = updateUserRequestSchema.partial();

export const deleteUserRequestSchema = z.object({
  id: z.string().uuid()
});
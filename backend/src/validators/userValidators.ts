import { z } from 'zod';

export const listUsersSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional()
});

export const getUserSchema = z.object({
  id: z.string().uuid()
});

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  email: z.string().email()
});

export const partialUpdateUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).optional(),
  email: z.string().email().optional()
});

export const deleteUserSchema = z.object({
  id: z.string().uuid()
});
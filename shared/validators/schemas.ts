import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshTokenSchema = z.object({
  token: z.string()
});

export const logoutUserSchema = z.object({
  token: z.string()
});

export const listUsersSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getUserSchema = z.object({
  id: z.string().uuid()
});

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional()
});

export const partialUpdateUserSchema = updateUserSchema.partial();

export const deleteUserSchema = z.object({
  id: z.string().uuid()
});
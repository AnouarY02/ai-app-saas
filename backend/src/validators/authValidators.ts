import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const refreshTokenSchema = z.object({
  userId: z.string().uuid()
});

export const logoutUserSchema = z.object({
  userId: z.string().uuid()
});
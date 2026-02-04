import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
});

export const loginRequestSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshRequestSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const logoutRequestSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const getUserRequestSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
});

export const updateUserRequestSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().min(1, 'Name is required').optional(),
});

export const getInsightsRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

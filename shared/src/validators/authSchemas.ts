import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});

export const logoutRequestSchema = z.object({
  token: z.string().min(1),
});

export const updateProfileRequestSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LogoutRequest = z.infer<typeof logoutRequestSchema>;
export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;

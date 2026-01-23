// Shared data validation schemas using zod
import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string(),
  is_active: z.boolean(),
});

export const authResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  user: userProfileSchema,
});

export const dashboardDataSchema = z.object({
  user: userProfileSchema,
  stats: z.record(z.any()).optional(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type DashboardData = z.infer<typeof dashboardDataSchema>;

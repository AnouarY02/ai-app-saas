import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerUserRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8)
});

export const createUserRequestSchema = registerUserRequestSchema;

export const createInsightRequestSchema = z.object({
  userId: z.string(),
  content: z.string().min(1)
});

export const listUsersRequestSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const listInsightsRequestSchema = listUsersRequestSchema;
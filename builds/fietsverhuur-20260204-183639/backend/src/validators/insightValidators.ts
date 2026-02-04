import { z } from 'zod';

export const createInsightSchema = z.object({
  userId: z.string(),
  content: z.string().min(1),
});

export const updateInsightSchema = z.object({
  content: z.string().min(1).optional(),
}).partial();
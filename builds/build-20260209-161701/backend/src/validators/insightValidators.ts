import { z } from 'zod';

export const createInsightSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

export const updateInsightSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional()
}).partial();

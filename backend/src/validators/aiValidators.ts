import { z } from 'zod';

export const aiInteractionRequestSchema = z.object({
  input: z.string().min(1),
});

export const queryParamsSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

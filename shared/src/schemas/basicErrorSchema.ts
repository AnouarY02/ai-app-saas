// Zod schema for ErrorResponse validation
import { z } from 'zod';

export const basicErrorSchema = z.object({
  status: z.literal('error'),
  message: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
});

export type BasicErrorSchema = typeof basicErrorSchema;

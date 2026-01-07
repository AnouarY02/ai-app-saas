// shared/src/validators/queryParamsSchema.ts
import { z } from 'zod';

export const queryParamsSchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
  offset: z.coerce.number().int().nonnegative().optional(),
});

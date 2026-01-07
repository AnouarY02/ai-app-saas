// Zod schemas for common validation
import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
  search: z.string().optional(),
  stage: z.string().optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID'),
});

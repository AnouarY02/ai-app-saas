// Common validation schemas
import { z } from 'zod';

export const queryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
  search: z.string().optional(),
  stage: z.string().optional(),
  contactId: z.string().uuid().optional()
});

export const pathParamsSchema = z.object({
  id: z.string().uuid()
});

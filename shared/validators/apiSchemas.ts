// Zod schemas for API param/query validation
import { z } from 'zod';
import { TASK_STATUSES } from '../constants';

export const queryParamsSchema = z.object({
  status: z.enum(TASK_STATUSES).optional(),
  dueDate: z.string().datetime().optional(),
});

export const pathParamsSchema = z.object({
  id: z.string().uuid(),
});

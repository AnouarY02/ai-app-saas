// Zod schemas for task-related validation
import { z } from 'zod';
import { TASK_STATUSES, TASK_TITLE_MAX_LENGTH, TASK_DESCRIPTION_MAX_LENGTH } from '../constants';

export const createTaskRequestSchema = z.object({
  title: z.string().min(1).max(TASK_TITLE_MAX_LENGTH),
  description: z.string().max(TASK_DESCRIPTION_MAX_LENGTH).optional(),
  dueDate: z.string().datetime().optional(),
});

export const updateTaskRequestSchema = z.object({
  title: z.string().min(1).max(TASK_TITLE_MAX_LENGTH).optional(),
  description: z.string().max(TASK_DESCRIPTION_MAX_LENGTH).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  dueDate: z.string().datetime().optional(),
});

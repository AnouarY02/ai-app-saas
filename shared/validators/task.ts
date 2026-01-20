// Task validators
import { z } from 'zod';
import { TASK_STATUSES } from '../constants/statuses';

export const createTaskRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  assigneeId: z.string(),
  status: z.enum(TASK_STATUSES),
  dueDate: z.string().datetime(),
});

export const updateTaskRequestSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
  status: z.enum(TASK_STATUSES).optional(),
  dueDate: z.string().datetime().optional(),
});

export const taskListQuerySchema = z.object({
  projectId: z.string().optional(),
  assigneeId: z.string().optional(),
  status: z.enum(TASK_STATUSES).optional(),
});

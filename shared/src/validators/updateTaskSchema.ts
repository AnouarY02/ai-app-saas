import { z } from 'zod';
import type { TaskStatus } from '../types/task';

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  dueDate: z.string().datetime().optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

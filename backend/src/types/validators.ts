import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const updateProfileRequestSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional()
});

export const createTaskRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional()
});

export const updateTaskRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  dueDate: z.string().datetime().optional()
});

export const queryParamsSchema = z.object({
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  dueDate: z.string().datetime().optional()
});

export const pathParamsSchema = z.object({
  id: z.string().uuid()
});

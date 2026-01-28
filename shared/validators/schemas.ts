import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshRequestSchema = z.object({
  refreshToken: z.string()
});

export const logoutRequestSchema = z.object({
  token: z.string()
});

export const listTasksRequestSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getTaskRequestSchema = z.object({
  id: z.string().uuid()
});

export const createTaskRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  })
});

export const updateTaskRequestSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  dueDate: z.string().optional().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  })
});

export const partialUpdateTaskRequestSchema = updateTaskRequestSchema.partial();

export const deleteTaskRequestSchema = z.object({
  id: z.string().uuid()
});
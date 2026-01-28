import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshRequestSchema = z.object({
  token: z.string()
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
  description: z.string().optional(),
  status: z.string(),
  dueDate: z.string().optional()
});

export const updateTaskRequestSchema = createTaskRequestSchema.partial();

export const partialUpdateTaskRequestSchema = createTaskRequestSchema.partial();

export const deleteTaskRequestSchema = z.object({
  id: z.string().uuid()
});
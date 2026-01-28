import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerRequestSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshRequestSchema = z.object({
  refreshToken: z.string()
});

export const logoutRequestSchema = z.object({});

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
  status: z.string().min(1),
  priority: z.string().min(1),
  dueDate: z.string().optional()
});

export const updateTaskRequestSchema = createTaskRequestSchema.partial();

export const partialUpdateTaskRequestSchema = createTaskRequestSchema.partial();

export const deleteTaskRequestSchema = z.object({
  id: z.string().uuid()
});
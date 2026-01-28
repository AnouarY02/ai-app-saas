import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshTokenSchema = z.object({
  token: z.string()
});

export const logoutUserSchema = z.object({
  token: z.string()
});

export const listTasksSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional()
});

export const getTaskSchema = z.object({
  id: z.string()
});

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.date(),
  userId: z.string()
});

export const updateTaskSchema = createTaskSchema.partial();

export const partialUpdateTaskSchema = createTaskSchema.partial();

export const deleteTaskSchema = z.object({
  id: z.string()
});
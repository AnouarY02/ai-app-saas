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

export const logoutSchema = z.object({
  token: z.string()
});

export const listTasksSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getTaskSchema = z.object({
  id: z.string().uuid()
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.string()
});

export const updateTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional()
});

export const partialUpdateTaskSchema = updateTaskSchema.partial();

export const deleteTaskSchema = z.object({
  id: z.string().uuid()
});
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
  refreshToken: z.string()
});

export const logoutUserSchema = z.object({});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.string(),
  dueDate: z.string()
});

export const updateTaskSchema = createTaskSchema.partial();

export const partialUpdateTaskSchema = createTaskSchema.partial();

export const deleteTaskSchema = z.object({
  id: z.string()
});

export const listTasksSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getTaskSchema = z.object({
  id: z.string()
});
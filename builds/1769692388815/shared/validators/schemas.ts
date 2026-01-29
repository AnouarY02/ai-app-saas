import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const registerUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

export const refreshTokenSchema = z.object({
  token: z.string()
});

export const logoutSchema = z.object({
  token: z.string()
});

export const listUsersSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getUserSchema = z.object({
  id: z.string().uuid()
});

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional()
});

export const deleteUserSchema = z.object({
  id: z.string().uuid()
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
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.date(),
  userId: z.string().uuid()
});

export const updateTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  dueDate: z.date().optional()
});

export const deleteTaskSchema = z.object({
  id: z.string().uuid()
});
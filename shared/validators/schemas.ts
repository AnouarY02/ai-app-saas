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
  token: z.string()
});

export const logoutRequestSchema = z.object({
  token: z.string()
});

export const listRequestSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1)
});

export const getRequestSchema = z.object({
  id: z.string().uuid()
});

export const updateUserRequestSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional()
});

export const deleteRequestSchema = z.object({
  id: z.string().uuid()
});

export const createTaskRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string()
});

export const updateTaskRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  dueDate: z.string().optional()
});
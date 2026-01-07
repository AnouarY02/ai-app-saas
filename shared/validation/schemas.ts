// Zod schemas for validation (shared between frontend and backend)
import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export const contactUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export const dealCreateSchema = z.object({
  title: z.string().min(1),
  value: z.number().min(0),
  stage: z.string().min(1),
  contactId: z.string().uuid(),
});

export const dealUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  value: z.number().min(0).optional(),
  stage: z.string().min(1).optional(),
  contactId: z.string().uuid().optional(),
});

export const queryParamsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
  stage: z.string().optional(),
  contactId: z.string().uuid().optional(),
});

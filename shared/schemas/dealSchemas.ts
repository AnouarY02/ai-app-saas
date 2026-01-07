// Zod schemas for deal validation
import { z } from 'zod';

export const dealCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  value: z.number().min(0, 'Value must be positive'),
  stage: z.string().min(1, 'Stage is required'),
});

export const dealUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  value: z.number().min(0).optional(),
  stage: z.string().min(1).optional(),
});

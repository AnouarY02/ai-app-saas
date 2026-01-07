import { z } from 'zod';

export const dealCreateSchema = z.object({
  title: z.string().min(1),
  value: z.number().min(0),
  stage: z.string().min(1),
  contactId: z.string().uuid().optional()
});

export const dealUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  value: z.number().min(0).optional(),
  stage: z.string().min(1).optional(),
  contactId: z.string().uuid().optional()
});

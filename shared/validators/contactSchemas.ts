// Contact validation schemas
import { z } from 'zod';

export const contactCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3),
  company: z.string().min(1)
});

export const contactUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(3).optional(),
  company: z.string().min(1).optional()
});

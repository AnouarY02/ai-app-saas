// shared/src/utils/validation.ts
import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateSettingsRequestSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export const aiRequestCreateSchema = z.object({
  input: z.string().min(1),
});

export type LoginRequestInput = z.infer<typeof loginRequestSchema>;
export type UpdateSettingsRequestInput = z.infer<typeof updateSettingsRequestSchema>;
export type AIRequestCreateInput = z.infer<typeof aiRequestCreateSchema>;

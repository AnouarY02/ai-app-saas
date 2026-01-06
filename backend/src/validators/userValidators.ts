import { z } from 'zod';

export const updateSettingsRequestSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
});

import { z } from 'zod';

export const updateSettingsRequestSchema = z.object({
  settings: z.array(z.object({
    key: z.string().min(1),
    value: z.string()
  }))
});


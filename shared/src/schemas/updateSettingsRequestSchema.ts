import { z } from 'zod';

export const updateSettingsRequestSchema = z.object({
  preferences: z.record(z.string(), z.unknown()),
});

export type UpdateSettingsRequest = z.infer<typeof updateSettingsRequestSchema>;

import { z } from 'zod';

export const userSettingsSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  preferences: z.record(z.string(), z.unknown()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;

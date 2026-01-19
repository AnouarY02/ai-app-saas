// shared/validators/logoutRequestSchema.ts
import { z } from 'zod';

export const logoutRequestSchema = z.object({
  token: z.string().min(1),
});

export type LogoutRequest = z.infer<typeof logoutRequestSchema>;

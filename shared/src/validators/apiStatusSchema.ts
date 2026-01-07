// Zod schema for ApiStatus
import { z } from 'zod';

export const apiStatusSchema = z.object({
  status: z.enum(['ok', 'error']),
  message: z.string().optional(),
  code: z.string().optional(),
});

export type ApiStatusInput = z.input<typeof apiStatusSchema>;
export type ApiStatusOutput = z.output<typeof apiStatusSchema>;

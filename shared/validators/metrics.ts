// Metrics validators
import { z } from 'zod';

export const metricsQuerySchema = z.object({
  teamId: z.string().optional(),
  period: z.string().optional(),
  type: z.string().optional(),
});

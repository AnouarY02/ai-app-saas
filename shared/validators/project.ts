// Project validators
import { z } from 'zod';

export const createProjectRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  teamId: z.string(),
});

export const updateProjectRequestSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

// Team validators
import { z } from 'zod';

export const createTeamRequestSchema = z.object({
  name: z.string().min(1),
});

export const updateTeamRequestSchema = z.object({
  name: z.string().min(1).optional(),
});

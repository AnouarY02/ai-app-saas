// Board validators
import { z } from 'zod';

export const createBoardRequestSchema = z.object({
  name: z.string().min(1),
});

export const updateBoardRequestSchema = z.object({
  name: z.string().min(1).optional(),
  columns: z.array(z.object({
    id: z.string(),
    name: z.string(),
    taskIds: z.array(z.string()),
  })).optional(),
});

import { z } from 'zod';

export const aiRequestCreateSchema = z.object({
  input: z.string().min(1)
});

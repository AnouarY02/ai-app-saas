// shared/src/validators/aiSchemas.ts
import { z } from 'zod';

export const aiInteractionRequestSchema = z.object({
  input: z.string().min(1),
});

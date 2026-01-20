// Comment validators
import { z } from 'zod';

export const createCommentRequestSchema = z.object({
  content: z.string().min(1),
});

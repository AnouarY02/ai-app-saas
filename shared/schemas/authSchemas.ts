// Zod schema for login
import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password required'),
});

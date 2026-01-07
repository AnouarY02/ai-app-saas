// Utility for validation with Zod
import { ZodSchema } from 'zod';

export function validate<T>(schema: ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return {
      success: false,
      errors: result.error.errors.map(e => e.message),
    };
  }
}

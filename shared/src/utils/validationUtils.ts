// shared/src/utils/validationUtils.ts
import { ZodSchema } from 'zod';
import type { APIError } from '../types/error';

export function validate<T>(schema: ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: APIError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return {
      success: false,
      error: {
        code: 'INVALID_INPUT',
        message: 'Validation failed',
        details: result.error.errors,
      },
    };
  }
}

// Validation utility for safe parsing
import { ZodSchema } from 'zod';
import type { ErrorResponse } from '../types/errors';

export function validate<T>(schema: ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: ErrorResponse } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: {
      error: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: result.error.flatten(),
    },
  };
}

import { ZodSchema, ZodError } from 'zod';
import type { ApiError } from '../types';

export function validate<T>(schema: ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: ApiError } {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Validation failed',
          details: err.errors,
        },
      };
    }
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Unknown validation error',
      },
    };
  }
}

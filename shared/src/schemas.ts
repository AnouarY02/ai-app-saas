// Shared validation schemas for ai-app
import { z } from 'zod';
import type { HealthStatus } from './types';

/**
 * healthCheckResponseSchema validates the shape of the /api/health response.
 * Example: { status: 'ok' }
 */
export const healthCheckResponseSchema = z.object({
  status: z.string().refine(
    (val): val is HealthStatus => val === 'ok' || val === 'error',
    {
      message: 'status must be either "ok" or "error"',
    }
  ),
});

/**
 * emptyObjectSchema validates an empty object (for request bodies that should be empty).
 */
export const emptyObjectSchema = z.object({}).strict();

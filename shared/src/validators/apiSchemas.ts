// Zod schemas for API validation
import { z } from 'zod';

/**
 * Schema for an empty object (no properties allowed)
 */
export const emptyObjectSchema = z.object({}).strict();

/**
 * Schema for health status response
 */
export const apiHealthStatusSchema = z.object({
  status: z.string()
});

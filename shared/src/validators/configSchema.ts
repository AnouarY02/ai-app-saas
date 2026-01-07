// Zod schema for AppConfig validation
import { z } from 'zod';
import { SUPPORTED_ENVS, SUPPORTED_LOG_LEVELS } from '../config/constants';

export const configSchema = z.object({
  appName: z.string().min(1),
  version: z.string().min(1),
  env: z.enum(SUPPORTED_ENVS),
  apiBaseUrl: z.string().url(),
  logLevel: z.enum(SUPPORTED_LOG_LEVELS).optional(),
});

export type ConfigSchema = z.infer<typeof configSchema>;

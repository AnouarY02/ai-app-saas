// shared/src/validators.ts
import { AppConfig } from './types';

/**
 * Simple runtime validation for AppConfig objects.
 * Throws an error if validation fails.
 */
export function validateAppConfig(config: unknown): asserts config is AppConfig {
  if (
    typeof config !== 'object' ||
    config === null ||
    typeof (config as any).appName !== 'string' ||
    typeof (config as any).version !== 'string'
  ) {
    throw new Error('Invalid AppConfig: Missing required fields appName or version');
  }
}

/**
 * appConfigSchema: JSON schema for AppConfig (for use with validation libraries if needed).
 */
export const appConfigSchema = {
  type: 'object',
  properties: {
    appName: { type: 'string' },
    version: { type: 'string' },
    frontendUrl: { type: 'string', nullable: true },
    backendUrl: { type: 'string', nullable: true }
  },
  required: ['appName', 'version'],
  additionalProperties: false
};

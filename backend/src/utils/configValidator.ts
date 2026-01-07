import { AppConfig } from '../types/config';

export function validateConfig(config: Partial<AppConfig>): AppConfig {
  if (!config.port || typeof config.port !== 'number') {
    throw new Error('PORT must be a number');
  }
  if (!config.env || typeof config.env !== 'string') {
    throw new Error('ENV must be a string');
  }
  return config as AppConfig;
}

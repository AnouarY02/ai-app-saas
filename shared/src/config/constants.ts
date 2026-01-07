// Shared constant values and configurations

export const DEFAULT_APP_NAME = 'ai-app';
export const DEFAULT_VERSION = '1.0.0';
export const DEFAULT_ENV: 'development' | 'production' | 'test' = 'development';
export const DEFAULT_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error' = 'info';

export const SUPPORTED_ENVS = ['development', 'production', 'test'] as const;
export const SUPPORTED_LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

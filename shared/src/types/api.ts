// Shared API status type
export type ApiStatus = 'ok' | 'error';

// Shared AppConfig type
export interface AppConfig {
  appName: string;
  version: string;
  env: 'development' | 'production' | 'test';
  apiBaseUrl: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

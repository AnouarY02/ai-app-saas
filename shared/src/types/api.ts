// Shared API types

export type ApiStatus = {
  status: 'ok' | 'error';
  message?: string;
  code?: string;
};

export interface AppConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
}

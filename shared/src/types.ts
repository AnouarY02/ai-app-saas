// shared/src/types.ts

/**
 * AppConfig: Basic configuration for the app, shared between frontend and backend.
 */
export interface AppConfig {
  appName: string;
  version: string;
  frontendUrl?: string;
  backendUrl?: string;
}

/**
 * ApiResponse: Generic API response wrapper.
 * T is the type of the data payload.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string | number;
}

// Shared types for config and API responses
export interface AppConfig {
  appName: string;
  buildId: string;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

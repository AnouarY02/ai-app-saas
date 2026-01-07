// API error type
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

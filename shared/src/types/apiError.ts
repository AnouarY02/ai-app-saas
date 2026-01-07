// ApiError: for error responses
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

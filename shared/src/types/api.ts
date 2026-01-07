// Shared API status and error types

export type ApiStatus = 'success' | 'error';

export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string; // Optional error code for programmatic handling
  details?: unknown; // Optional additional error details
}

// Centralized error codes and messages
import type { ApiErrorCode } from '../types/error';

export const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'Authentication required.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Request validation failed.',
  INTERNAL_ERROR: 'An unexpected error occurred.',
};

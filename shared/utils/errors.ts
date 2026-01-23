// Helper for creating standardized API errors
import type { ApiError, ApiErrorCode } from '../types/error';
import { ERROR_MESSAGES } from '../api/errorTypes';

export function createApiError(code: ApiErrorCode, details?: any): ApiError {
  return {
    code,
    message: ERROR_MESSAGES[code] || 'Unknown error',
    details,
  };
}

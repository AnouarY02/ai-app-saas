// shared/utils/errorNormalizer.ts
// Normalize errors for API and UI
import type { ApiError } from '../types/api';
import { ApiErrorCode } from '../types/errorTypes';

export function normalizeError(error: any): ApiError {
  if (!error) {
    return { code: ApiErrorCode.INTERNAL_ERROR, message: 'Unknown error' };
  }
  if (typeof error === 'string') {
    return { code: ApiErrorCode.INTERNAL_ERROR, message: error };
  }
  if (error.code && error.message) {
    return error as ApiError;
  }
  if (error instanceof Error) {
    return { code: ApiErrorCode.INTERNAL_ERROR, message: error.message };
  }
  return { code: ApiErrorCode.INTERNAL_ERROR, message: 'Unknown error' };
}

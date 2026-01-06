export const SESSION_TOKEN_HEADER = 'Authorization';
export const SESSION_COOKIE_NAME = 'session_token';
export const API_BASE_PATH = '/api';

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
} as const;

// Shared constants
export const API_BASE_URL = typeof window === 'undefined'
  ? process.env.BACKEND_URL || 'http://localhost:3000'
  : import.meta.env.VITE_BACKEND_URL || '/api';

export const SESSION_TOKEN_KEY = 'ai_app_session_token';

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  // ...add more as needed
} as const;

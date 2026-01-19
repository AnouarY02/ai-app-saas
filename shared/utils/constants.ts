// shared/utils/constants.ts
// Shared constants for API endpoints, roles, etc.

export const API_BASE_PATH = '/api';

export const AUTH_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
};

export const USER_ENDPOINTS = {
  ME: '/user/me',
};

export const USER_ROLES = ['user'] as const;

export type UserRole = typeof USER_ROLES[number];

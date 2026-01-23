// Shared API constants for TestApp

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  DASHBOARD: '/dashboard',
};

export const AUTH_HEADER = 'Authorization';
export const BEARER_PREFIX = 'Bearer ';

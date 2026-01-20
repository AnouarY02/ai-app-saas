// shared/authUtils.ts

import { UserAuthToken } from './types/user';

export function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('fittrack_token');
}

export function setTokenToStorage(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('fittrack_token', token);
}

export function removeTokenFromStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('fittrack_token');
}

export function parseAuthHeader(header: string | undefined): string | null {
  if (!header) return null;
  const match = header.match(/^Bearer (.+)$/i);
  return match ? match[1] : null;
}

export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    return Date.now() / 1000 > decoded.exp;
  } catch {
    return true;
  }
}

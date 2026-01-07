// shared/src/utils/authUtils.ts

export function isAuthenticated(token?: string | null): boolean {
  return typeof token === 'string' && token.length > 0;
}

export function getAuthHeader(token?: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

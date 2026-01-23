import { LoginRequest } from '../types/api';

export function validateLoginRequest(body: any): { error?: string } {
  if (!body || typeof body.email !== 'string' || typeof body.password !== 'string') {
    return { error: 'Invalid payload' };
  }
  return {};
}

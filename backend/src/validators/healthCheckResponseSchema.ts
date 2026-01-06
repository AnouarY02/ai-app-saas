import { HealthStatus } from '../types/health';

export function validateHealthCheckResponse(obj: any): { valid: boolean; errors?: string[] } {
  if (typeof obj !== 'object' || obj === null) {
    return { valid: false, errors: ['Response is not an object'] };
  }
  if (typeof obj.status !== 'string') {
    return { valid: false, errors: ['status must be a string'] };
  }
  return { valid: true };
}

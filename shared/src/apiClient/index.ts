// Minimal API client for frontend/backend shared usage
import type { ApiStatus } from '../types/api';
import { SharedError, SharedErrorCode } from '../errorTypes';

export interface ApiClientOptions {
  baseUrl: string;
  headers?: Record<string, string>;
}

export class ApiClient {
  baseUrl: string;
  headers: Record<string, string>;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.headers = options.headers || {};
  }

  async getStatus(): Promise<ApiStatus> {
    try {
      const res = await fetch(`${this.baseUrl}/status`, {
        headers: this.headers,
      });
      if (!res.ok) {
        throw new SharedError(
          SharedErrorCode.NETWORK,
          `Failed to fetch status: ${res.status}`
        );
      }
      return (await res.json()) as ApiStatus;
    } catch (err) {
      if (err instanceof SharedError) throw err;
      throw new SharedError(SharedErrorCode.UNKNOWN, 'Unknown error', err);
    }
  }
}

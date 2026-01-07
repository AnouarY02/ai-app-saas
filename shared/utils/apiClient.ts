// Simple API client abstraction for frontend
export interface ApiClientOptions {
  baseUrl: string;
  getToken?: () => string | undefined;
}

export class ApiClient {
  private baseUrl: string;
  private getToken?: () => string | undefined;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.getToken = options.getToken;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const token = this.getToken?.();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      let err;
      try { err = await res.json(); } catch { err = { error: res.statusText }; }
      throw err;
    }
    return res.json();
  }

  get<T>(path: string) {
    return this.request<T>(path, { method: 'GET' });
  }
  post<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) });
  }
  put<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'PUT', body: JSON.stringify(body) });
  }
  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

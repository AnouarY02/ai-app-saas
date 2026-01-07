// API client abstraction (for frontend)
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  getToken?: () => string | null;
}

export class ApiClient {
  private baseURL: string;
  private getToken?: () => string | null;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.getToken = config.getToken;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (this.getToken) {
      const token = this.getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axios({
      ...config,
      baseURL: this.baseURL,
      headers: { ...this.getHeaders(), ...config.headers }
    });
  }
}

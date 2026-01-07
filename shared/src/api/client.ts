// shared/src/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ErrorResponse } from '../types/api';

export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string, defaultHeaders?: Record<string, string>) {
    this.axios = axios.create({
      baseURL,
      headers: defaultHeaders,
      withCredentials: true,
    });
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.axios.request<T>(config);
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        throw err.response.data as ErrorResponse;
      }
      throw { error: err.message || 'Unknown error', code: 'INTERNAL_ERROR' } as ErrorResponse;
    }
  }
}

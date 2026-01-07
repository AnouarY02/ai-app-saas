import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, SESSION_TOKEN_KEY } from '../constants';

// Simple API client for browser and Node.js
export class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.axios = axios.create({ baseURL });
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(SESSION_TOKEN_KEY, token);
      }
    } else {
      delete this.axios.defaults.headers.common['Authorization'];
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(SESSION_TOKEN_KEY);
      }
    }
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.request<T>(config);
  }

  // Convenience methods
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(url, config);
  }
}

// Singleton for browser usage
let apiClient: ApiClient | null = null;
export function getApiClient(): ApiClient {
  if (!apiClient) {
    apiClient = new ApiClient();
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem(SESSION_TOKEN_KEY);
      if (token) apiClient.setAuthToken(token);
    }
  }
  return apiClient;
}

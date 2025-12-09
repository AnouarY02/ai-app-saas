import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiClientOptions {
  baseURL?: string;
  getToken?: () => string | undefined;
}

export class ApiClient {
  private axios: AxiosInstance;
  private getToken?: () => string | undefined;

  constructor(options: ApiClientOptions = {}) {
    this.axios = axios.create({ baseURL: options.baseURL });
    this.getToken = options.getToken;
    this.axios.interceptors.request.use((config) => {
      const token = this.getToken?.();
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  public async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.request<T>(config);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(url, config);
  }
}


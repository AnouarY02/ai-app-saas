import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiClientOptions {
  baseURL?: string;
  getToken?: () => string | undefined;
}

export function createApiClient(options: ApiClientOptions = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL || '/api',
    withCredentials: true,
  });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = options.getToken?.();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

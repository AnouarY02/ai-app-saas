// shared/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export function createApiClient(baseURL: string, getToken?: () => string | undefined): AxiosInstance {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken ? getToken() : undefined;
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

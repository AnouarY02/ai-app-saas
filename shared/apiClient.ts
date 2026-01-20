// shared/apiClient.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getTokenFromStorage } from './authUtils';

export interface ApiClientOptions {
  baseURL: string;
}

export function createApiClient(options: ApiClientOptions): AxiosInstance {
  const instance = axios.create({ baseURL: options.baseURL });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getTokenFromStorage();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

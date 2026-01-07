// Shared API client abstraction (for frontend, can be adapted for backend integration tests)
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function apiRequest<T = any>(
  method: AxiosRequestConfig['method'],
  url: string,
  data?: any,
  token?: string
): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: {},
  };
  if (token) {
    config.headers!['Authorization'] = `Bearer ${token}`;
  }
  const response: AxiosResponse<T> = await axios(config);
  return response.data;
}

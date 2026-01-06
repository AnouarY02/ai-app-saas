import axios from 'axios';
import {
  User,
  LoginResponse,
  AIRequest,
  UpdateSettingsRequest
} from '../types/apiTypes';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}

export async function logoutRequest(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get('/user/me');
  return res.data;
}

export async function updateUserSettings(
  data: UpdateSettingsRequest
): Promise<User> {
  const res = await api.put('/user/settings', data);
  return res.data;
}

export async function createAIRequest(input: string): Promise<AIRequest> {
  const res = await api.post('/ai/requests', { input });
  return res.data;
}

export async function listAIRequests(): Promise<AIRequest[]> {
  const res = await api.get('/ai/requests');
  return res.data;
}

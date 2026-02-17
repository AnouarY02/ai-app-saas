import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUsers = async () => {
  const response = await apiClient.get('/api/users');
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await apiClient.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (data: any) => {
  const response = await apiClient.post('/api/users', data);
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await apiClient.put(`/api/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/api/users/${id}`);
  return response.data;
};

export const getInsights = async () => {
  const response = await apiClient.get('/api/insights');
  return response.data;
};

export const getInsight = async (id: string) => {
  const response = await apiClient.get(`/api/insights/${id}`);
  return response.data;
};

export const createInsight = async (data: any) => {
  const response = await apiClient.post('/api/insights', data);
  return response.data;
};

export const updateInsight = async (id: string, data: any) => {
  const response = await apiClient.put(`/api/insights/${id}`, data);
  return response.data;
};

export const deleteInsight = async (id: string) => {
  const response = await apiClient.delete(`/api/insights/${id}`);
  return response.data;
};

export const login = async (data: any) => {
  const response = await apiClient.post('/api/auth/login', data);
  return response.data;
};

export const register = async (data: any) => {
  const response = await apiClient.post('/api/auth/register', data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/api/auth/me');
  return response.data;
};

export default apiClient;

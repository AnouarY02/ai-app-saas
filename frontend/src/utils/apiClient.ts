import axios from 'axios';

const API_BASE = '/api';

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data;
}

export async function registerRequest(email: string, password: string, name?: string): Promise<AuthResponse> {
  const res = await axios.post(`${API_BASE}/auth/register`, { email, password, name });
  return res.data;
}

export async function logoutRequest(token: string): Promise<void> {
  await axios.post(
    `${API_BASE}/auth/logout`,
    { token },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function getProfile(token: string): Promise<User> {
  const res = await axios.get(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateProfile(
  token: string,
  data: { name?: string; email?: string; password?: string }
): Promise<User> {
  const res = await axios.put(`${API_BASE}/users/me`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

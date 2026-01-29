const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {})
  };
}

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

export async function getTasks() {
  // Implement task fetching logic
}

export async function getTask(id: string) {
  // Implement single task fetching logic
}

export async function createTask(data: any) {
  // Implement task creation logic
}

export async function updateTask(id: string, data: any) {
  // Implement task update logic
}

export async function deleteTask(id: string) {
  // Implement task deletion logic
}
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {})
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeatherData {
  id: string;
  userId: string;
  location: string;
  temperature: number;
  condition: string;
  retrievedAt: string;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

export async function register(email: string, password: string, username: string) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username })
  });
  return response.json();
}

export async function logout() {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/weather-data`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getTask(id: string) {
  const response = await fetch(`${API_URL}/api/weather-data/${id}`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function createTask(data: any) {
  const response = await fetch(`${API_URL}/api/weather-data`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function updateTask(id: string, data: any) {
  const response = await fetch(`${API_URL}/api/weather-data/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function deleteTask(id: string) {
  const response = await fetch(`${API_URL}/api/weather-data/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
}
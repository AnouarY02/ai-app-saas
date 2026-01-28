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

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

export async function register(email: string, password: string, name: string) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password, name })
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
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getTask(id: string) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function createTask(data: Partial<Task>) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function updateTask(id: string, data: Partial<Task>) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function deleteTask(id: string) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
}
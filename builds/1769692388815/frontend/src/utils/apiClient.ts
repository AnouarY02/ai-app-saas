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

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
  const response = await fetch(`${API_URL}/api/tasks`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getTask(id: string) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
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
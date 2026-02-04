const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {})
  };
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

export async function register(email, password, name) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password, name })
  });
  return response.json();
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getInsights() {
  const response = await fetch(`${API_URL}/api/insights`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function getUser(id) {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function createUser(data) {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function updateUser(id, data) {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
}

export async function refreshToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: getAuthHeaders()
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
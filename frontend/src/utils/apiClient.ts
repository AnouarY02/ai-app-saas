const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

// Types
export interface UserPublic {
  id: string;
  email: string;
}

// Auth API functions
export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const registerRequest = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const logoutRequest = async () => {
  const response = await fetch(`${apiUrl}/auth/logout`, { method: 'POST' });
  return response.json();
};

export const getProfile = async () => {
  const response = await fetch(`${apiUrl}/auth/me`);
  return response.json();
};

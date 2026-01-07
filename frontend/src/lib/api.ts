// API utility for ai-app frontend

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Types
interface UserPublic {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  token: string;
  user: UserPublic;
}

interface DashboardData {
  [key: string]: any;
}

interface UserSettings {
  id: string;
  userId: string;
  preferences: any;
  createdAt: string;
  updatedAt: string;
}

// API functions
export async function login(email: string, password: string): Promise<LoginResponse> {
  const resp = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!resp.ok) throw new Error('Login failed');
  return resp.json();
}

export async function logout(token: string): Promise<void> {
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
}

export async function getMe(token: string): Promise<UserPublic> {
  const resp = await fetch(`${API_BASE}/api/users/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error('Not authenticated');
  return resp.json();
}

export async function getDashboardData(token: string): Promise<DashboardData> {
  const resp = await fetch(`${API_BASE}/api/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error('Dashboard fetch failed');
  return resp.json();
}

export async function getSettings(token: string): Promise<UserSettings> {
  const resp = await fetch(`${API_BASE}/api/settings`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error('Settings fetch failed');
  return resp.json();
}

export async function updateSettings(token: string, data: { preferences: any }): Promise<UserSettings> {
  const resp = await fetch(`${API_BASE}/api/settings`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error('Settings update failed');
  return resp.json();
}

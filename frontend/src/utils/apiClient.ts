// API client for SaaS CRM frontend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

// --- Auth Token Storage ---
export function getStoredToken(): string | null {
  return localStorage.getItem('auth_token');
}
export function setStoredToken(token: string) {
  localStorage.setItem('auth_token', token);
}
export function clearStoredToken() {
  localStorage.removeItem('auth_token');
}

// --- JWT decode (simple, not verifying signature) ---
export function getUserFromToken(token: string): { id: string; email: string } | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user ? payload.user : { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

// --- Auth API ---
export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Invalid email or password');
  return await res.json(); // { token, user }
}

export async function apiLogout() {
  const token = getStoredToken();
  await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
}

// --- Dashboard ---
export async function getDashboardSummary() {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/dashboard/summary`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return await res.json();
}

// --- Contacts ---
export async function getContacts() {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/contacts`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return await res.json();
}

export async function getContact(id: string) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/contacts/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to fetch contact');
  return await res.json();
}

export async function createContact(data: { name: string; email: string; phone: string }) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return await res.json();
}

export async function updateContact(id: string, data: { name: string; email: string; phone: string }) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update contact');
  return await res.json();
}

export async function deleteContact(id: string) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/contacts/${id}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return await res.json();
}

// --- Deals ---
export async function getDeals() {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/deals`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to fetch deals');
  return await res.json();
}

export async function getDeal(id: string) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/deals/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to fetch deal');
  return await res.json();
}

export async function createDeal(data: { title: string; value: number; stage: string }) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/deals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create deal');
  return await res.json();
}

export async function updateDeal(id: string, data: { title: string; value: number; stage: string }) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/deals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update deal');
  return await res.json();
}

export async function deleteDeal(id: string) {
  const token = getStoredToken();
  const res = await fetch(`${BASE_URL}/api/deals/${id}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error('Failed to delete deal');
  return await res.json();
}

const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

// --- Types ---
export interface UserPublic {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
export interface ContactCreate {
  name: string;
  email: string;
  phone: string;
  company: string;
}
export type ContactUpdate = Partial<ContactCreate>;
export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
export interface DealCreate {
  title: string;
  value: number;
  stage: string;
  contactId: string;
}
export type DealUpdate = Partial<DealCreate>;
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: UserPublic;
}
export interface SuccessResponse {
  success: boolean;
  message?: string;
}
export interface DashboardMetrics {
  totalContacts: number;
  totalDeals: number;
  dealsByStage: Record<string, number>;
  totalDealValue: number;
}

// --- Helper ---
function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleResponse(res: Response) {
  if (!res.ok) {
    return res.json().then((data) => {
      throw new Error(data.message || 'API Error');
    });
  }
  return res.json();
}

// --- Auth ---
export async function loginRequest(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function logoutRequest(): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
}

export async function getProfile(): Promise<UserPublic> {
  const res = await fetch(`${apiUrl}/api/auth/me`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

// --- Contacts ---
export async function getContacts(): Promise<PaginatedResult<Contact>> {
  const res = await fetch(`${apiUrl}/api/contacts`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function createContact(data: ContactCreate): Promise<Contact> {
  const res = await fetch(`${apiUrl}/api/contacts`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function getContact(id: string): Promise<Contact> {
  const res = await fetch(`${apiUrl}/api/contacts/${id}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function updateContact(id: string, data: ContactUpdate): Promise<Contact> {
  const res = await fetch(`${apiUrl}/api/contacts/${id}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteContact(id: string): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/contacts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

// --- Deals ---
export async function getDeals(): Promise<PaginatedResult<Deal>> {
  const res = await fetch(`${apiUrl}/api/deals`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function createDeal(data: DealCreate): Promise<Deal> {
  const res = await fetch(`${apiUrl}/api/deals`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function getDeal(id: string): Promise<Deal> {
  const res = await fetch(`${apiUrl}/api/deals/${id}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function updateDeal(id: string, data: DealUpdate): Promise<Deal> {
  const res = await fetch(`${apiUrl}/api/deals/${id}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteDeal(id: string): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/deals/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

// --- Dashboard ---
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const res = await fetch(`${apiUrl}/api/dashboard/metrics`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

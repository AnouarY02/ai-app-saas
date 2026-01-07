const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface UserPublic {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ContactCreate {
  name: string
  email: string
  phone?: string
  company?: string
}

export interface ContactUpdate {
  name?: string
  email?: string
  phone?: string
  company?: string
}

export interface Deal {
  id: string
  title: string
  value: number
  stage: string
  contactId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface DealCreate {
  title: string
  value: number
  stage: string
  contactId: string
}

export interface DealUpdate {
  title?: string
  value?: number
  stage?: string
  contactId?: string
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface DashboardMetrics {
  totalContacts: number
  totalDeals: number
  dealsByStage: Record<string, number>
  totalDealValue: number
}

export interface AuthResponse {
  token: string
  user: UserPublic
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return await res.json()
}

export async function logout(): Promise<void> {
  await fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}

export async function getMe(): Promise<UserPublic> {
  const res = await fetch(`${apiUrl}/auth/me`, {
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Not authenticated')
  return await res.json()
}

export async function getContacts(params?: { search?: string; page?: number; pageSize?: number }): Promise<PaginatedResult<Contact>> {
  const url = new URL(`${apiUrl}/contacts`)
  if (params) Object.entries(params).forEach(([k, v]) => v !== undefined && url.searchParams.append(k, String(v)))
  const res = await fetch(url.toString(), { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch contacts')
  return await res.json()
}

export async function getContact(id: string): Promise<Contact> {
  const res = await fetch(`${apiUrl}/contacts/${id}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Contact not found')
  return await res.json()
}

export async function createContact(data: ContactCreate): Promise<Contact> {
  const res = await fetch(`${apiUrl}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create contact')
  return await res.json()
}

export async function updateContact(id: string, data: ContactUpdate): Promise<Contact> {
  const res = await fetch(`${apiUrl}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update contact')
  return await res.json()
}

export async function deleteContact(id: string): Promise<void> {
  const res = await fetch(`${apiUrl}/contacts/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Failed to delete contact')
}

export async function getDeals(params?: { stage?: string; contactId?: string; page?: number; pageSize?: number }): Promise<PaginatedResult<Deal>> {
  const url = new URL(`${apiUrl}/deals`)
  if (params) Object.entries(params).forEach(([k, v]) => v !== undefined && url.searchParams.append(k, String(v)))
  const res = await fetch(url.toString(), { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch deals')
  return await res.json()
}

export async function getDeal(id: string): Promise<Deal> {
  const res = await fetch(`${apiUrl}/deals/${id}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Deal not found')
  return await res.json()
}

export async function createDeal(data: DealCreate): Promise<Deal> {
  const res = await fetch(`${apiUrl}/deals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create deal')
  return await res.json()
}

export async function updateDeal(id: string, data: DealUpdate): Promise<Deal> {
  const res = await fetch(`${apiUrl}/deals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update deal')
  return await res.json()
}

export async function deleteDeal(id: string): Promise<void> {
  const res = await fetch(`${apiUrl}/deals/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Failed to delete deal')
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const res = await fetch(`${apiUrl}/dashboard/metrics`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch dashboard metrics')
  return await res.json()
}

const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface UserPublic {
  id: string
  email: string
  name?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: UserPublic
}

export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  title: string
  value: number
  stage: string
  contactId?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface DeleteResponse {
  success: boolean
}

export interface DashboardMetrics {
  totalContacts: number
  totalDeals: number
  dealsByStage: Record<string, number>
  totalDealValue: number
}

// Auth
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

export async function getMe(token: string): Promise<UserPublic> {
  const res = await fetch(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

// Contacts
export async function fetchContacts(token: string, search = '', page = 1, pageSize = 20): Promise<PaginatedResult<Contact>> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  params.append('page', String(page))
  params.append('pageSize', String(pageSize))
  const res = await fetch(`${apiUrl}/contacts?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch contacts')
  return res.json()
}

export async function fetchContact(token: string, id: string): Promise<Contact> {
  const res = await fetch(`${apiUrl}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Contact not found')
  return res.json()
}

export async function createContact(token: string, data: Partial<Contact>): Promise<Contact> {
  const res = await fetch(`${apiUrl}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create contact')
  return res.json()
}

export async function updateContact(token: string, id: string, data: Partial<Contact>): Promise<Contact> {
  const res = await fetch(`${apiUrl}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update contact')
  return res.json()
}

export async function deleteContact(token: string, id: string): Promise<DeleteResponse> {
  const res = await fetch(`${apiUrl}/contacts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete contact')
  return res.json()
}

// Deals
export async function fetchDeals(token: string, stage = '', contactId = '', page = 1, pageSize = 20): Promise<PaginatedResult<Deal>> {
  const params = new URLSearchParams()
  if (stage) params.append('stage', stage)
  if (contactId) params.append('contactId', contactId)
  params.append('page', String(page))
  params.append('pageSize', String(pageSize))
  const res = await fetch(`${apiUrl}/deals?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch deals')
  return res.json()
}

export async function fetchDeal(token: string, id: string): Promise<Deal> {
  const res = await fetch(`${apiUrl}/deals/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Deal not found')
  return res.json()
}

export async function createDeal(token: string, data: Partial<Deal>): Promise<Deal> {
  const res = await fetch(`${apiUrl}/deals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create deal')
  return res.json()
}

export async function updateDeal(token: string, id: string, data: Partial<Deal>): Promise<Deal> {
  const res = await fetch(`${apiUrl}/deals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update deal')
  return res.json()
}

export async function deleteDeal(token: string, id: string): Promise<DeleteResponse> {
  const res = await fetch(`${apiUrl}/deals/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete deal')
  return res.json()
}

// Dashboard
export async function fetchDashboardMetrics(token: string): Promise<DashboardMetrics> {
  const res = await fetch(`${apiUrl}/dashboard/metrics`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch dashboard metrics')
  return res.json()
}

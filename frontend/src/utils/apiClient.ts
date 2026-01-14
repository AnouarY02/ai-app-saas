const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface UserPublic {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: UserPublic
}

export interface Court {
  id: string
  name: string
  location?: string
  surfaceType?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  courtId: string
  startTime: string
  endTime: string
  status: 'active' | 'cancelled' | 'completed'
  createdAt: string
  updatedAt: string
  user?: UserPublic
  court?: Court
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed')
  return res.json()
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Signup failed')
  return res.json()
}

export async function getSession(): Promise<UserPublic> {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No session')
  const res = await fetch(`${apiUrl}/api/auth/session`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Session expired')
  return res.json()
}

export function logout() {
  // No backend call needed for JWT stateless logout
  localStorage.removeItem('token')
}

export async function getMe(): Promise<UserPublic> {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')
  const res = await fetch(`${apiUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function getCourts(): Promise<Court[]> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/courts`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch courts')
  return res.json()
}

export async function createCourt(data: { name: string; location?: string; surfaceType?: string }): Promise<Court> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/courts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to create court')
  return res.json()
}

export async function updateCourt(id: string, data: Partial<Court>): Promise<Court> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/courts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to update court')
  return res.json()
}

export async function deleteCourt(id: string): Promise<{ success: boolean }> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/courts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete court')
  return res.json()
}

export async function getBookings(params?: { userId?: string; courtId?: string; status?: string }): Promise<Booking[]> {
  const token = localStorage.getItem('token')
  const url = new URL(`${apiUrl}/api/bookings`)
  if (params) Object.entries(params).forEach(([k, v]) => v && url.searchParams.append(k, v))
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}

export async function createBooking(data: { courtId: string; startTime: string; endTime: string }): Promise<Booking> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to create booking')
  return res.json()
}

export async function updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to update booking')
  return res.json()
}

export async function cancelBooking(id: string): Promise<{ success: boolean }> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/bookings/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to cancel booking')
  return res.json()
}

export async function getUsers(): Promise<UserPublic[]> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/users`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function updateUser(id: string, data: Partial<UserPublic>): Promise<UserPublic> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to update user')
  return res.json()
}

export async function deleteUser(id: string): Promise<{ success: boolean }> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiUrl}/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete user')
  return res.json()
}

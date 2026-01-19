const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface SignupRequest {
  email: string
  password: string
  name?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LogoutRequest {
  token: string
}

export interface SuccessResponse {
  success: boolean
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
}

export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Signup failed')
  return res.json()
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed')
  return res.json()
}

export async function logout(token: string): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ token })
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Logout failed')
  return res.json()
}

export async function getMe(): Promise<User> {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')
  const res = await fetch(`${apiUrl}/api/user/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Not authenticated')
  return res.json()
}

export async function updateMe(data: UpdateUserRequest): Promise<User> {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')
  const res = await fetch(`${apiUrl}/api/user/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Update failed')
  return res.json()
}

const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:8000'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  is_active: boolean
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: UserProfile
}

export interface LogoutResponse {
  success: boolean
}

export interface DashboardData {
  user: UserProfile
  stats?: Record<string, any>
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'Invalid credentials')
  }
  return res.json()
}

export async function logout(token: string): Promise<LogoutResponse> {
  const res = await fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) {
    throw new Error('Logout failed')
  }
  return res.json()
}

export async function getMe(token: string): Promise<UserProfile> {
  const res = await fetch(`${apiUrl}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) {
    throw new Error('Not authenticated')
  }
  return res.json()
}

export async function getDashboard(token: string): Promise<DashboardData> {
  const res = await fetch(`${apiUrl}/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) {
    if (res.status === 401) throw new Error('Unauthorized')
    throw new Error('Failed to fetch dashboard')
  }
  return res.json()
}

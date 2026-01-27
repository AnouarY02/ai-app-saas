const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface UserProfile {
  id: string
  email: string
  createdAt: string
  lastLoginAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: { id: string; email: string }
}

export interface LogoutResponse {
  success: boolean
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Invalid credentials')
  }
  return res.json()
}

export async function logout(token: string): Promise<LogoutResponse> {
  const res = await fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({})
  })
  if (!res.ok) {
    throw new Error('Logout failed')
  }
  return res.json()
}

export async function getMe(token: string): Promise<UserProfile> {
  const res = await fetch(`${apiUrl}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) {
    throw new Error('Not authenticated')
  }
  return res.json()
}

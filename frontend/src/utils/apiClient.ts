const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface UserPublic {
  id: string
  email: string
  name?: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: UserPublic
}

export interface SuccessResponse {
  message: string
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

export async function register(email: string, password: string, name?: string): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed')
  return res.json()
}

export async function getProfile(token: string): Promise<UserPublic> {
  const res = await fetch(`${apiUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export async function updateProfile(token: string, data: { name?: string; password?: string }): Promise<UserPublic> {
  const res = await fetch(`${apiUrl}/api/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Update failed')
  return res.json()
}

export async function logout(token: string): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Logout failed')
  return res.json()
}

export async function fetchTasks(token: string, params?: { status?: string; dueDate?: string }): Promise<Task[]> {
  const url = new URL(`${apiUrl}/api/tasks`)
  if (params) {
    if (params.status) url.searchParams.append('status', params.status)
    if (params.dueDate) url.searchParams.append('dueDate', params.dueDate)
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(token: string, data: { title: string; description?: string; dueDate?: string }): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Create failed')
  return res.json()
}

export async function getTask(token: string, id: string): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Task not found')
  return res.json()
}

export async function updateTask(token: string, id: string, data: { title?: string; description?: string; status?: string; dueDate?: string }): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Update failed')
  return res.json()
}

export async function deleteTask(token: string, id: string): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Delete failed')
  return res.json()
}

const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface UserPublic {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: UserPublic
}

export interface RegisterUserRequest {
  email: string
  password: string
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface TaskListResponse {
  tasks: Task[]
}

export interface CreateTaskRequest {
  title: string
  description?: string
  dueDate?: string
}

export interface UpdateTaskRequest {
  title?: string
  description?: string
  status?: 'pending' | 'in_progress' | 'completed'
  dueDate?: string
}

export interface DeleteTaskResponse {
  success: boolean
}

function getAuthHeaders(token?: string) {
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export async function loginUser(data: LoginUserRequest): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed')
  return res.json()
}

export async function registerUser(data: RegisterUserRequest): Promise<AuthResponse> {
  const res = await fetch(`${apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed')
  return res.json()
}

export async function fetchTasks(token: string): Promise<Task[]> {
  const res = await fetch(`${apiUrl}/api/tasks`, {
    headers: { ...getAuthHeaders(token) },
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to fetch tasks')
  const data: TaskListResponse = await res.json()
  return data.tasks
}

export async function fetchTask(token: string, taskId: string): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
    headers: { ...getAuthHeaders(token) },
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to fetch task')
  return res.json()
}

export async function createTask(token: string, data: CreateTaskRequest): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders(token) },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to create task')
  return res.json()
}

export async function updateTask(token: string, taskId: string, data: UpdateTaskRequest): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders(token) },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to update task')
  return res.json()
}

export async function deleteTask(token: string, taskId: string): Promise<DeleteTaskResponse> {
  const res = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(token) },
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to delete task')
  return res.json()
}

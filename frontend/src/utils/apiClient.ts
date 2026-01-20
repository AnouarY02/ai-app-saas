// API Client for Padel Club Manager
const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  role: 'admin' | 'member'
}

export interface Team {
  id: string
  name: string
  members: User[]
}

export interface Project {
  id: string
  name: string
  description: string
  teamId: string
  createdAt: string
}

export interface Board {
  id: string
  projectId: string
  name: string
  columns: Column[]
}

export interface Column {
  id: string
  name: string
  taskIds: string[]
}

export interface Task {
  id: string
  title: string
  description: string
  assigneeId: string
  status: string
  dueDate: string
  createdAt: string
}

export interface Comment {
  id: string
  taskId: string
  authorId: string
  content: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  message: string
  read: boolean
  createdAt: string
}

export interface Metric {
  id: string
  teamId: string
  type: string
  value: number
  period: string
}

export interface Activity {
  id: string
  projectId: string
  actorId: string
  type: string
  payload: any
  createdAt: string
}

// Auth
export async function login(email: string, password: string) {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

export async function logout() {
  await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export async function getCurrentUser(): Promise<User> {
  const res = await fetch(`${apiUrl}/api/users/me`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

export async function updateCurrentUser(data: Partial<User>): Promise<User> {
  const res = await fetch(`${apiUrl}/api/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update user')
  return res.json()
}

// Teams
export async function getTeams(): Promise<Team[]> {
  const res = await fetch(`${apiUrl}/api/teams`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch teams')
  return res.json()
}

// Projects
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${apiUrl}/api/projects`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function getProject(projectId: string): Promise<Project> {
  const res = await fetch(`${apiUrl}/api/projects/${projectId}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch project')
  return res.json()
}

export async function createProject(data: { name: string; description: string; teamId: string }): Promise<Project> {
  const res = await fetch(`${apiUrl}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create project')
  return res.json()
}

export async function updateProject(projectId: string, data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${apiUrl}/api/projects/${projectId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update project')
  return res.json()
}

// Boards
export async function getBoards(projectId: string): Promise<Board[]> {
  const res = await fetch(`${apiUrl}/api/projects/${projectId}/boards`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch boards')
  return res.json()
}

export async function getBoard(boardId: string): Promise<Board> {
  const res = await fetch(`${apiUrl}/api/boards/${boardId}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch board')
  return res.json()
}

// Tasks
export async function getTasks(params?: { projectId?: string }): Promise<Task[]> {
  let url = `${apiUrl}/api/tasks`
  if (params?.projectId) url += `?projectId=${params.projectId}`
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function getTask(taskId: string): Promise<Task> {
  const res = await fetch(`${apiUrl}/api/tasks/${taskId}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch task')
  return res.json()
}

// Comments
export async function getComments(taskId: string): Promise<Comment[]> {
  const res = await fetch(`${apiUrl}/api/tasks/${taskId}/comments`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch comments')
  return res.json()
}

export async function createComment(taskId: string, content: string): Promise<Comment> {
  const res = await fetch(`${apiUrl}/api/tasks/${taskId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ content })
  })
  if (!res.ok) throw new Error('Failed to add comment')
  return res.json()
}

// Activity
export async function getProjectActivity(projectId: string): Promise<Activity[]> {
  const res = await fetch(`${apiUrl}/api/projects/${projectId}/activity`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch activity')
  return res.json()
}

// Notifications
export async function getNotifications(): Promise<Notification[]> {
  const res = await fetch(`${apiUrl}/api/notifications`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch notifications')
  return res.json()
}

export async function markNotificationAsRead(notificationId: string): Promise<Notification> {
  const res = await fetch(`${apiUrl}/api/notifications/${notificationId}/read`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to mark as read')
  return res.json()
}

// Metrics
export async function getMetrics(): Promise<Metric[]> {
  const res = await fetch(`${apiUrl}/api/metrics`, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch metrics')
  return res.json()
}

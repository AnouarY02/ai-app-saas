export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export interface UserLoginRequest {
  email: string
  password: string
}

export interface UserSignupRequest {
  email: string
  password: string
  full_name: string
}

export interface UserProfileUpdateRequest {
  full_name?: string
  password?: string
}

export interface AuthTokenResponse {
  token: string
}

export interface Workout {
  id: string
  user_id: string
  date: string
  type: string
  duration_minutes: number
  calories_burned: number
  notes: string
  created_at: string
  updated_at: string
}

export interface WorkoutCreateRequest {
  date: string
  type: string
  duration_minutes: number
  calories_burned: number
  notes: string
}

export interface WorkoutUpdateRequest {
  date?: string
  type?: string
  duration_minutes?: number
  calories_burned?: number
  notes?: string
}

export interface WorkoutListResponse {
  workouts: Workout[]
}

export interface SuccessResponse {
  success: boolean
  message?: string
}

const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function loginUser(data: UserLoginRequest): Promise<AuthTokenResponse> {
  const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

export async function signupUser(data: UserSignupRequest): Promise<AuthTokenResponse> {
  const res = await fetch(`${apiUrl}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Signup failed')
  return res.json()
}

export async function logoutUser(): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/v1/auth/logout`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Logout failed')
  return res.json()
}

export async function getCurrentUser(): Promise<User> {
  const res = await fetch(`${apiUrl}/api/v1/users/me`, {
    headers: getAuthHeaders()
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

export async function updateCurrentUser(data: UserProfileUpdateRequest): Promise<User> {
  const res = await fetch(`${apiUrl}/api/v1/users/me`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Profile update failed')
  return res.json()
}

export async function listWorkouts(): Promise<WorkoutListResponse> {
  const res = await fetch(`${apiUrl}/api/v1/workouts`, {
    headers: getAuthHeaders()
  })
  if (!res.ok) throw new Error('Failed to fetch workouts')
  return res.json()
}

export async function createWorkout(data: WorkoutCreateRequest): Promise<Workout> {
  const res = await fetch(`${apiUrl}/api/v1/workouts`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create workout')
  return res.json()
}

export async function updateWorkout(id: string, data: WorkoutUpdateRequest): Promise<Workout> {
  const res = await fetch(`${apiUrl}/api/v1/workouts/${id}`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update workout')
  return res.json()
}

export async function deleteWorkout(id: string): Promise<SuccessResponse> {
  const res = await fetch(`${apiUrl}/api/v1/workouts/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  if (!res.ok) throw new Error('Failed to delete workout')
  return res.json()
}

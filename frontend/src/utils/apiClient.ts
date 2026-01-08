const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

// ============================================
// TYPES
// ============================================
export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface AuthResponse {
  user: UserPublic;
  token: string;
}

// ============================================
// AUTH API
// ============================================
export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const registerRequest = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return response.json();
};

export const logoutRequest = async (): Promise<void> => {
  await fetch(`${apiUrl}/auth/logout`, { method: 'POST' });
};

export const getProfile = async (): Promise<UserPublic> => {
  const response = await fetch(`${apiUrl}/auth/me`);
  return response.json();
};

// ============================================
// TASKS API (with token)
// ============================================
export const fetchTasks = async (token: string): Promise<Task[]> => {
  const response = await fetch(`${apiUrl}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const fetchTask = async (token: string, id: string): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const createTask = async (token: string, data: CreateTaskRequest): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const updateTask = async (token: string, id: string, data: UpdateTaskRequest): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const deleteTask = async (token: string, id: string): Promise<void> => {
  await fetch(`${apiUrl}/tasks/${id}`, { 
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

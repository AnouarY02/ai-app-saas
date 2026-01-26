// No API endpoints defined for this static landing page.
// This file is provided for future extensibility.

export const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

// Additional type exports
export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  startTime: string;
  endTime: string;
}

export interface Court {
  id: string;
  name: string;
  type: string;
  available: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Metric {
  name: string;
  value: number;
  change: number;
}

export interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

export interface Board {
  id: string;
  name: string;
  columns: string[];
}

// API functions
export const getTasks = async () => { return []; };
export const getTask = async (id: string) => { return null; };
export const getComments = async (taskId: string) => { return []; };
export const createComment = async (data: any) => { return null; };
export const createWorkout = async (data: any) => { return null; };
export const updateCurrentUser = async (data: any) => { return null; };

export interface WorkoutCreateRequest {
  type: string;
  duration: number;
  calories: number;
}

export interface UserProfileUpdateRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

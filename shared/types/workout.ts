// shared/types/workout.ts

export interface Workout {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  type: string;
  duration_minutes: number;
  calories_burned: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutCreateRequest {
  date: string;
  type: string;
  duration_minutes: number;
  calories_burned: number;
  notes?: string;
}

export interface WorkoutUpdateRequest {
  date?: string;
  type?: string;
  duration_minutes?: number;
  calories_burned?: number;
  notes?: string;
}

export interface WorkoutListQuery {
  start_date?: string; // YYYY-MM-DD
  end_date?: string;   // YYYY-MM-DD
  type?: string;
  limit?: number;
  offset?: number;
}

export interface WorkoutListResponse {
  items: Workout[];
  total: number;
}

export interface WorkoutIdPath {
  workout_id: string;
}

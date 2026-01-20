export interface Workout {
  id: string;
  user_id: string;
  date: string; // ISO date
  type: string;
  duration_minutes: number;
  calories_burned: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutCreate {
  date: string;
  type: string;
  duration_minutes: number;
  calories_burned: number;
  notes?: string;
}

export interface WorkoutUpdate {
  date?: string;
  type?: string;
  duration_minutes?: number;
  calories_burned?: number;
  notes?: string;
}

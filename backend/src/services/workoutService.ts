import { v4 as uuidv4 } from 'uuid';
import { Workout, WorkoutCreate, WorkoutUpdate } from '../types/workout';
import { workouts } from '../store/inMemoryDb';

export async function listUserWorkouts(userId: string): Promise<Workout[]> {
  return workouts.filter(w => w.user_id === userId);
}

export async function createUserWorkout(userId: string, data: WorkoutCreate): Promise<Workout> {
  const now = new Date().toISOString();
  const workout: Workout = {
    id: uuidv4(),
    user_id: userId,
    date: data.date,
    type: data.type,
    duration_minutes: data.duration_minutes,
    calories_burned: data.calories_burned,
    notes: data.notes || '',
    created_at: now,
    updated_at: now
  };
  workouts.push(workout);
  return workout;
}

export async function getUserWorkoutById(userId: string, workoutId: string): Promise<Workout | undefined> {
  return workouts.find(w => w.user_id === userId && w.id === workoutId);
}

export async function updateUserWorkout(userId: string, workoutId: string, update: WorkoutUpdate): Promise<Workout | undefined> {
  const workout = workouts.find(w => w.user_id === userId && w.id === workoutId);
  if (!workout) return undefined;
  if (update.date) workout.date = update.date;
  if (update.type) workout.type = update.type;
  if (update.duration_minutes) workout.duration_minutes = update.duration_minutes;
  if (update.calories_burned) workout.calories_burned = update.calories_burned;
  if (update.notes !== undefined) workout.notes = update.notes;
  workout.updated_at = new Date().toISOString();
  return workout;
}

export async function deleteUserWorkout(userId: string, workoutId: string): Promise<boolean> {
  const idx = workouts.findIndex(w => w.user_id === userId && w.id === workoutId);
  if (idx === -1) return false;
  workouts.splice(idx, 1);
  return true;
}

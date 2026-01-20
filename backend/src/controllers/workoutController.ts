import { Request, Response, NextFunction } from 'express';
import {
  listUserWorkouts,
  createUserWorkout,
  getUserWorkoutById,
  updateUserWorkout,
  deleteUserWorkout
} from '../services/workoutService';
import { logWithTimestamp } from '../utils/logger';

export async function listWorkouts(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const workouts = await listUserWorkouts(userId);
    res.json({ workouts });
  } catch (err) {
    next(err);
  }
}

export async function createWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { date, type, duration_minutes, calories_burned, notes } = req.body;
    if (!date || !type || !duration_minutes || !calories_burned) {
      return res.status(400).json({ error: 'Missing required workout fields.' });
    }
    const workout = await createUserWorkout(userId, {
      date,
      type,
      duration_minutes,
      calories_burned,
      notes
    });
    logWithTimestamp(`Workout created for user ${userId}.`);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
}

export async function getWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const workoutId = req.params.workout_id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const workout = await getUserWorkoutById(userId, workoutId);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (err) {
    next(err);
  }
}

export async function updateWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const workoutId = req.params.workout_id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { date, type, duration_minutes, calories_burned, notes } = req.body;
    const updated = await updateUserWorkout(userId, workoutId, {
      date,
      type,
      duration_minutes,
      calories_burned,
      notes
    });
    if (!updated) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    logWithTimestamp(`Workout ${workoutId} updated for user ${userId}.`);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const workoutId = req.params.workout_id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const deleted = await deleteUserWorkout(userId, workoutId);
    if (!deleted) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    logWithTimestamp(`Workout ${workoutId} deleted for user ${userId}.`);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

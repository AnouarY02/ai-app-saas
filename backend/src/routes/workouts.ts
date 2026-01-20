import express from 'express';
import {
  listWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, listWorkouts);
router.post('/', requireAuth, createWorkout);
router.get('/:workout_id', requireAuth, getWorkout);
router.put('/:workout_id', requireAuth, updateWorkout);
router.delete('/:workout_id', requireAuth, deleteWorkout);

export default router;

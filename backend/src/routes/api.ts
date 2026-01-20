import express from 'express';
import authRouter from './auth';
import usersRouter from './users';
import workoutsRouter from './workouts';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/workouts', workoutsRouter);

export default router;

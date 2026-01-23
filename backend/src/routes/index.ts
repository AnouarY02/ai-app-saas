import { Router } from 'express';
import authRouter from './auth';
import tasksRouter from './tasks';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', tasksRouter);

export default router;

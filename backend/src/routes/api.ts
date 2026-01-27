import express from 'express';
import healthRouter from './health';
import authRouter from './auth';
import usersRouter from './users';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;

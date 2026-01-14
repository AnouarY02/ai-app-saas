import { Router } from 'express';
import healthRouter from './health';
import authRouter from './auth';
import userRouter from './user';
import courtRouter from './court';
import bookingRouter from './booking';

const router = Router();

router.use('/health', healthRouter);
router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/courts', courtRouter);
router.use('/api/bookings', bookingRouter);

export default router;

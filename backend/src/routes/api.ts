import { Router } from 'express';
import { authRouter } from './auth';
import { userRouter } from './user';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

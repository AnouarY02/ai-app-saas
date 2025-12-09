import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'express';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);


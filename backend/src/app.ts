import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import contactsRouter from './routes/contacts';
import dealsRouter from './routes/deals';
import dashboardRouter from './routes/dashboard';
import { logger } from './utils/logger';

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? (process.env.CORS_ORIGIN || '*') : '*',
  credentials: true
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/deals', dealsRouter);
app.use('/api/dashboard', dashboardRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

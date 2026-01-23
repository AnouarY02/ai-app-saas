import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import dashboardRouter from './routes/dashboard';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers';
import { logWithTimestamp } from './utils/logger';

dotenv.config();

const app = express();

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || '*',
  credentials: true
};
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(cors(corsOptions));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logWithTimestamp(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

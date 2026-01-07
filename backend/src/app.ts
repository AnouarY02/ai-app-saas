import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers';
import healthRouter from './routes/health';
import apiRouter from './routes/api';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow all origins in development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// Logging
app.use(morgan('dev'));

// Routes
app.use('/health', healthRouter);
app.use('/api', apiRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers';
import { logWithTimestamp } from './utils/logger';

dotenv.config();

const app = express();

// Enable CORS for all origins in development
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  logWithTimestamp(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/health', healthRouter);

// 404 handler
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);

export default app;

import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import healthRouter from './routes/health';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers';
import { logWithTimestamp } from './utils/logger';

dotenvConfig();

function dotenvConfig() {
  // Only load dotenv if not already loaded (for testability)
  if (!process.env.DOTENV_LOADED) {
    require('dotenv').config();
    process.env.DOTENV_LOADED = 'true';
  }
}

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev', { stream: { write: (msg) => logWithTimestamp(msg.trim()) } }));

// Routes
app.use('/api/health', healthRouter);

// 404 handler
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);

export default app;

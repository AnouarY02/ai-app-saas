import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logWithTimestamp } from './utils/logger';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow all origins in development
const isDev = process.env.NODE_ENV !== 'production';
app.use(cors({ origin: isDev ? '*' : undefined }));

// Logging
app.use(morgan('dev', {
  stream: {
    write: (msg: string) => logWithTimestamp(msg.trim())
  }
}));

// Routes
app.use('/', routes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;

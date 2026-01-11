import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

dotenv.config();

export function createServer(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api', apiRouter);

  // Health endpoint at root
  app.get('/health', (req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

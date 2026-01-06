import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';
import { errorHandler, notFoundHandler } from './core/errorHandlers';
import { loggerMiddleware } from './shared/logger';

export const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(loggerMiddleware);

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, app: process.env.npm_package_name || 'ai-app', buildId: process.env.BUILD_ID || 'dev' });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

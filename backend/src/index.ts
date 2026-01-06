import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import { logger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers';

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api', apiRouter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ ok: true, appName: process.env.npm_package_name || 'ai-app', buildId: process.env.BUILD_ID || 'unknown' });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
app.listen(PORT, () => {
  logger.info(`Backend server listening on port ${PORT}`);
});

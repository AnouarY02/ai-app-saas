import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

// Load env vars
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const app = express();

app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, appName: process.env.npm_package_name || 'ai-app', buildId: process.env.BUILD_ID || 'production-ready-v1' });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Backend listening on port ${PORT}`);
});

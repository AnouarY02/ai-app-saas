import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { logger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import apiRouter from './routes/api';

// Load env vars
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, buildId: process.env.BUILD_ID || 'dev', appName: process.env.APP_NAME || 'ai-app' });
});

// API routes
app.use('/api', apiRouter);

// 404
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
app.listen(PORT, () => {
  logger.info(`Backend listening on port ${PORT}`);
});

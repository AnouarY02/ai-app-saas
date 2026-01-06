import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import { logger, requestLogger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/error';

// Load env vars
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true
}));

// Logging
app.use(requestLogger);

// Body parser
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, appName: 'ai-app', buildId: 'enforce3layers-hardgate-test-1' });
});

// API routes
app.use('/api', apiRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} [${NODE_ENV}]`);
});

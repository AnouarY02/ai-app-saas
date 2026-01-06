// Main Express server bootstrap
import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers';
import { logger } from './utils/logger';

const app = express();

// CORS setup (allow all origins for dev, restrict via env if needed)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// JSON body parser
app.use(express.json());

// Simple request logger
app.use(logger);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, appName: process.env.APP_NAME || 'ai-app', buildId: process.env.BUILD_ID || 'quicktest' });
});

// API routes (none defined, but placeholder)
app.use('/api', apiRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[ai-app] Backend listening on port ${PORT}`);
});

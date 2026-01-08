import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = app.listen(PORT, () => {
  logWithTimestamp(`🚀 Server listening on port ${PORT}`);
});

const shutdown = (signal: string) => {
  logWithTimestamp(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logWithTimestamp('HTTP server closed.');
    process.exit(0);
  });
  // Force exit after 10s
  setTimeout(() => {
    logWithTimestamp('Forcing shutdown after 10s.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

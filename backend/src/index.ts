import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const server = app.listen(PORT, () => {
  logWithTimestamp(`🚀 Server listening on port ${PORT}`);
});

const shutdown = (signal: string) => {
  logWithTimestamp(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logWithTimestamp('Server closed. Exiting process.');
    process.exit(0);
  });
  // Force exit after 10s
  setTimeout(() => {
    logWithTimestamp('Force exiting after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

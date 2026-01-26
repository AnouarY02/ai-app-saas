import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  logWithTimestamp(`Server started on port ${PORT}`);
});

const shutdown = (signal: string) => {
  logWithTimestamp(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logWithTimestamp('Server closed. Exiting process.');
    process.exit(0);
  });
  setTimeout(() => {
    logWithTimestamp('Force exiting after 5s.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

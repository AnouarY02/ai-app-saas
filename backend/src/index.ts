import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logWithTimestamp(`Server listening on port ${PORT}`);
});

function shutdown(signal: string) {
  logWithTimestamp(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    logWithTimestamp('Server closed. Exiting process.');
    process.exit(0);
  });
  // Force exit if not closed in 10s
  setTimeout(() => {
    logWithTimestamp('Force exiting after 10s.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

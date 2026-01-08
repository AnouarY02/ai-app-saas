import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { logInfo, logError } from './utils/logger';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = app.listen(PORT, () => {
  logInfo(`Server listening on port ${PORT}`);
});

function shutdown(signal: string) {
  logInfo(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    logInfo('Server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    logError('Force exiting after 10s.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

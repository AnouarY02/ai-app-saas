import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { logInfo, logError } from './utils/logger';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = app.listen(PORT, () => {
  logInfo(`Server started on port ${PORT}`);
});

const shutdown = () => {
  logInfo('Graceful shutdown initiated');
  server.close(() => {
    logInfo('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('uncaughtException', (err) => {
  logError('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  logError('Unhandled Rejection:', reason);
  process.exit(1);
});

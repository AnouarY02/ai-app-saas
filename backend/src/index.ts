import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const server = app.listen(PORT, () => {
  logWithTimestamp(`🚀 Server listening on port ${PORT}`);
});

const shutdown = () => {
  logWithTimestamp('Received shutdown signal, closing server...');
  server.close(() => {
    logWithTimestamp('Server closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

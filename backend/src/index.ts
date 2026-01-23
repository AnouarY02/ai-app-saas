import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logWithTimestamp(`🚀 Server listening on port ${PORT}`);
});

const shutdown = () => {
  logWithTimestamp('Shutting down server...');
  server.close(() => {
    logWithTimestamp('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

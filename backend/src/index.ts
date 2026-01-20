import app from './app';
import { logWithTimestamp } from './utils/logger';

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  logWithTimestamp(`🚀 FitTrack Pro backend running on port ${PORT}`);
});

function gracefulShutdown(signal: string) {
  logWithTimestamp(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logWithTimestamp('Server closed. Bye!');
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

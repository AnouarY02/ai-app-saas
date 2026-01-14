import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});

const shutdown = () => {
  logger.info('Graceful shutdown initiated');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

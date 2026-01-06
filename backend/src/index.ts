import { app } from './app';
import { logger } from './shared/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(PORT, () => {
  logger.info(`Backend listening on port ${PORT}`);
});

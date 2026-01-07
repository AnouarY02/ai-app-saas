import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/error';
import apiRouter from './routes/api';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.listen(PORT, () => {
  logger.info(`Backend listening on port ${PORT}`);
});

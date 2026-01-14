import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error';
import { logger } from './utils/logger';

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev', {
  stream: {
    write: (msg: string) => logger.info(msg.trim())
  }
}));

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

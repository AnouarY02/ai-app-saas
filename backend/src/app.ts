import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/api';
import healthRouter from './routes/health';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logInfo } from './utils/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
};
if (process.env.NODE_ENV !== 'production') {
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  logInfo('CORS enabled for all origins (development mode)');
} else {
  app.use(cors(corsOptions));
}

app.use('/health', healthRouter);
app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

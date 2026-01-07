import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/api';
import healthRouter from './routes/health';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/health', healthRouter);
app.use('/api', apiRouter);

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import contactRoutes from './routes/contacts';
import dealRoutes from './routes/deals';
import dashboardRoutes from './routes/dashboard';
import healthRoutes from './routes/health';
import { logWithTimestamp } from './utils/logger';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? '*' : (process.env.CORS_ORIGIN || '*'),
  credentials: true
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/health', healthRoutes);

// 404 and error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logWithTimestamp(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

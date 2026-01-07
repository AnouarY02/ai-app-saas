import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import healthRouter from './routes/health';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import dealRoutes from './routes/dealRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
  credentials: true
};
app.use(cors(corsOptions));

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/health', healthRouter);
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);
app.use('/deals', dealRoutes);
app.use('/dashboard', dashboardRoutes);

// 404 handler
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);

export default app;

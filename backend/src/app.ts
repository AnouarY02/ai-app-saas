import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware';
import healthRouter from './routes/health';
import authRouter from './routes/authRoutes';
import contactRouter from './routes/contactRoutes';
import dealRouter from './routes/dealRoutes';
import dashboardRouter from './routes/dashboardRoutes';

const app = express();

// CORS config
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? '*' : process.env.FRONTEND_URL || false,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/contacts', contactRouter);
app.use('/deals', dealRouter);
app.use('/dashboard', dashboardRouter);

// 404 handler
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);

export default app;

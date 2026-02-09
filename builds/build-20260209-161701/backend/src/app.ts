import express from 'express';
import cors from 'cors';
import userRoutes from '@/routes/userRoutes';
import insightRoutes from '@/routes/insightRoutes';
import authRoutes from '@/routes/authRoutes';
import healthRoutes from '@/routes/healthRoutes';
import { errorHandler } from '@/middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

export default app;

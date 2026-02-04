import express from 'express';
import cors from 'cors';
import healthRouter from './routes/healthRoutes';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import insightRouter from './routes/insightRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/insights', insightRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
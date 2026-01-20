import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import healthRouter from './routes/health';
import apiRouter from './routes/api';
import { notFoundHandler, errorHandler } from './middleware/error';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan(':date[iso] :method :url :status :response-time ms'));

app.use('/health', healthRouter);
app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

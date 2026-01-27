import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/api';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(':date[iso] :method :url :status :response-time ms'));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

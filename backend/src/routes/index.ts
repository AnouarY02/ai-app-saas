import express from 'express';
import healthRouter from './health';
import apiRouter from './api';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/api', apiRouter);

export default router;

import express from 'express';
import authRouter from './auth';
import usersRouter from './users';
import teamsRouter from './teams';
import projectsRouter from './projects';
import boardsRouter from './boards';
import tasksRouter from './tasks';
import commentsRouter from './comments';
import notificationsRouter from './notifications';
import metricsRouter from './metrics';
import activityRouter from './activity';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/teams', teamsRouter);
router.use('/projects', projectsRouter);
router.use('/boards', boardsRouter);
router.use('/tasks', tasksRouter);
router.use('/comments', commentsRouter);
router.use('/notifications', notificationsRouter);
router.use('/metrics', metricsRouter);
router.use('/activity', activityRouter);

export default router;

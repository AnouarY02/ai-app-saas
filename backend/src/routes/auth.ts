import express from 'express';
import { register, login } from '../controllers/authController';
import { validateBody } from '../middleware/validate';
import { registerUserSchema, loginUserSchema } from '../validators/authSchemas';

const router = express.Router();

router.post('/register', validateBody(registerUserSchema), register);
router.post('/login', validateBody(loginUserSchema), login);

export default router;

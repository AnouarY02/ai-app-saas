import { User, Session } from '../models/types';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
      session?: { id: string };
    }
  }
}

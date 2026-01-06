import { Session } from '../models/session';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      session?: Session;
      token?: string;
    }
  }
}

import { UserPublic } from '../models/types';

declare global {
  namespace Express {
    interface Request {
      user?: UserPublic;
      token?: string;
    }
  }
}

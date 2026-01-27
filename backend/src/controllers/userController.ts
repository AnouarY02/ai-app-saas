import { Request, Response, NextFunction } from 'express';
import { listUsersSchema, getUserSchema, updateUserSchema, partialUpdateUserSchema, deleteUserSchema } from '../validators/userValidators';
import { fetchUsers, fetchUserById, modifyUser, partiallyModifyUser, removeUser } from '../services/userService';

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = listUsersSchema.parse(req.query);
    const result = await fetchUsers(data);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = getUserSchema.parse(req.params);
    const result = await fetchUserById(data.id);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = updateUserSchema.parse({ ...req.params, ...req.body });
    const result = await modifyUser(data);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const partialUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = partialUpdateUserSchema.parse({ ...req.params, ...req.body });
    const result = await partiallyModifyUser(data);
    res.json({ data: result, meta: {} });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = deleteUserSchema.parse(req.params);
    await removeUser(data.id);
    res.json({ data: { success: true }, meta: {} });
  } catch (error) {
    next(error);
  }
};
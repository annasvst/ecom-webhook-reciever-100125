import { Request, Response, NextFunction } from 'express';
import { userRequestSchema } from './userRequestSchema';
import z from 'zod';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // use dummy data for now
    const users = ['John Doe', 'Jane Doe', 'John Smith', 'Jane Smith'];
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const result = userRequestSchema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = z.flattenError(result.error);
      res.status(400).json({ error: 'Invalid date', details: errorMessage });
    }

    // Create user in DB
    // Return created user as data
    const createdUser = {
      name: req.body,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({ data: createdUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error occured. Call use if you want to know more' });
  }
};

export default {
  getAll,
  create,
};

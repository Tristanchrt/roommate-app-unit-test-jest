import { Filter, Filters } from '../models/filter';
import { Request, Response } from 'express';
import { UserDocument } from '../models/user';

export const update = (req: Request, res: Response): void => {
  const user: UserDocument = req.body._user;
  const filters: Array<Filter> = req.body.filters;
  user.filters = [...filters];

  user
    .save()
    .then((user) => res.status(202).json(user.filters))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

import { User, Users } from '../models/user';
import { Conversations } from '../models/conversation';
import { Request, Response, NextFunction } from 'express';
import { hashVal, json_schema } from '../functions/others';
import jwt from 'jsonwebtoken';
import atob from 'atob';
import fs from 'fs';
import { moveFile, STORAGE_PROFILE_PICTURE, upload, UPLOADED_FILE_NAME } from 'src/functions/upload';

export const checkIdentity = (req: Request, res: Response, next: NextFunction): void => {
  Users.findOne({
    _id: JSON.parse(atob(req.headers.authorization.split('.')[1])).id,
  })
    .then((user) => {
      if (!req.header('Authorization')) throw 'request unauthorized';
      const verif: string | unknown = jwt.verify(req.header('Authorization'), process.env.TOKEN_SECRET);
      if (!verif) throw 'request unauthorized';
      if (!user) throw 'request unauthorized';

      req.body._user = user;

      next();
    })
    .catch((error) => {
      res.status(401).json({
        error: error,
      });
    });
};

export const getFromToken = (req: Request, res: Response, next: NextFunction): void => {
  Users.findOne({
    _id: JSON.parse(atob(req.headers.authorization.split('.')[1])).id,
  })
    .then((user) => {
      req.body._user = user;
      next();
    })
    .catch((error) => {
      res.status(401).json({
        error: error,
      });
    });
};

export const updateAvatar = (req: Request, res: Response): void => {
  const _user: User = req.body._user;
  const profilePictureName = `${Date.now().toString()}-profile-picture.file`;
  try {
    upload(req, res, function (err: any) {
      const file = (req.files as Array<Express.Multer.File>)[0];
      moveFile(
        `./src/storage/temp/${UPLOADED_FILE_NAME(file.originalname)}`,
        `${STORAGE_PROFILE_PICTURE(_user._id)}/${profilePictureName}`,
        function (error: any) {
          if (error) {
            res.status(400).json({
              error: 'Error file rename' + error,
            });
          }
        },
      );
    });
    Users.findOneAndUpdate(
      { _id: _user._id },
      { $set: { avatar: profilePictureName } },
      { new: true, useFindAndModify: false },
    ).then((user) => {
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const connect = (req: Request, res: Response): void => {
  Users.findOne({ email: req.body.email.toLowerCase() })
    .then((user) => {
      if (user.password != hashVal(req.body.password)) res.status(404).json({ error: 'request unauthorized' });
      res.status(200).send({ ...user.profileConnect(), token: jwt.sign(json_schema(user), process.env.TOKEN_SECRET) });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const create = (req: Request, res: Response): void => {
  const user = new Users({ ...req.body });
  user.password = hashVal(user.password);
  user
    .save()
    .then((user) => {
      res.status(200).send({ ...user.profileConnect(), token: jwt.sign(json_schema(user), process.env.TOKEN_SECRET) });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const update = (req: Request, res: Response): void => {
  Users.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      user.update(req.body);
      Users.updateOne(
        { _id: req.params.id },
        {
          $set: user,
          $currentDate: { lastModified: true },
        },
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(404).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const findOne = (req: Request, res: Response): void => {
  Users.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      res.status(200).json(user.profile());
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const findMe = (req: Request, res: Response): void => {
  const userInfo = JSON.parse(atob(req.headers.authorization.split('.')[1]));
  Users.findOne({
    _id: userInfo.id,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const deleteOne = (req: Request, res: Response): void => {
  Users.deleteOne({
    _id: req.params.id,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const findAll = (req: Request, res: Response): void => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const findAvatar = (req: Request, res: Response): void => {
  try {
    const profilePictureName = `${req.params.fileName}`;
    const file = `${STORAGE_PROFILE_PICTURE(req.params.idUser)}/${profilePictureName}`;
    if (fs.existsSync(file)) {
      res.download(file, profilePictureName);
    } else {
      throw new Error('File not found');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const conversations = (req: Request, res: Response): void => {
  const user = JSON.parse(atob(req.headers.authorization.split('.')[1]));
  Users.findOne({
    _id: user.id,
  })
    .populate({
      path: 'conversations',
      populate: [
        {
          path: 'receivers',
          select: { lastName: 1, firstName: 1, avatar: 1 },
        },
        {
          path: 'messages',
          populate: {
            path: 'sender',
            select: { lastName: 1, firstName: 1, avatar: 1 },
          },
        },
      ],
    })
    .exec((err, user) => {
      if (err != null) res.status(400).json({ error: err });
      res.status(200).json(user.conversations);
    });
};

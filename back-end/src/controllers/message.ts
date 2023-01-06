import { Request, Response } from 'express';
import { Messages, TypeMessage } from '../models/message';
import { Conversations } from '../models/conversation';
import { moveFile, STORAGE_MESSAGE_FILE, upload, UPLOADED_FILE_NAME } from '../functions/upload';
import fs from 'fs';

export const findFileMessage = (req: Request, res: Response): void => {
  try {
    const filePath = 'src/storage/messages/' + req.params.id + '_' + req.params.fileName + '.file';
    if (fs.existsSync(filePath)) {
      res.download(filePath, req.params.fileName);
    } else {
      throw new Error('File not found');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const create = (req: Request, res: Response): void => {
  const message = new Messages({ ...req.body });
  message
    .save()
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

export const findAll = (req: Request, res: Response): void => {
  Messages.find()
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
// https://github.com/expressjs/multer/issues/309 typescript error
export const uploadFile = (req: Request, res: Response): void => {
  try {
    upload(req, res, function (err: any) {
      const file: Express.Multer.File = (req.files as Array<Express.Multer.File>)[0];
      const message = new Messages({ ...JSON.parse(req.body.message), message: file.originalname });
      if (file.mimetype.includes('image')) message.type = TypeMessage.image;
      message
        .save()
        .then((result) => {
          const fileName = `${result._id}_${(req.files as Array<Express.Multer.File>)[0].originalname}.file`;
          moveFile(
            `./src/storage/temp/${UPLOADED_FILE_NAME(file.originalname)}`,
            `${STORAGE_MESSAGE_FILE}/${fileName}`,
            function (error: any) {
              if (error) {
                res.status(400).json({
                  error: 'Error file rename' + error,
                });
              }
            },
          );
          Conversations.findOne({
            _id: message.conversationID,
          }).then((conversation) => {
            conversation.messages.push(message);
            Conversations.updateOne(
              { _id: conversation._id },
              {
                $set: conversation,
              },
            ).then(async () => {
              const response = await message
                .populate({ path: 'sender', select: { lastName: 1, firstName: 1, avatar: 1 } })
                .execPopulate();
              res.status(201).json(response);
            });
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
      if (err) {
        return err;
      }
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

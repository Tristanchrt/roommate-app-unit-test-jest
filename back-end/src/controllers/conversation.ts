import { Request, Response } from 'express';
import { Conversation, ConversationDocument, Conversations } from '../models/conversation';
import { Messages } from '../models/message';
import { User, Users } from '../models/user';

export const findOne = (req: Request, res: Response): void => {
  Conversations.findOne({
    _id: req.params.id,
  })
    .populate([
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
    ])
    .exec((err, conversation) => {
      if (err != null) res.status(400).json({ error: err });
      res.status(200).json(conversation);
    });
};

export const addMessage = (req: Request, res: Response): void => {
  const messageToAdd: string = req.body.messageToAdd;
  Conversations.findOne({
    _id: req.params.id,
  })
    .then((conversation) => {
      Messages.findOne({
        _id: messageToAdd,
      }).then((message) => {
        conversation.messages.push(message);
        Conversations.updateOne(
          { _id: conversation._id },
          {
            $set: conversation,
          },
        ).then(() => {
          res.status(200).json(conversation);
        });
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

export const createConv = (req: Request, res: Response): void => {
  const user: User = req.body._user;
  const users: Array<User> = [user._id, ...req.body.users];

  const conversation: ConversationDocument = new Conversations({ receivers: users, messages: [] });

  Conversations.findOne({
    receivers: { $size: users.length, $all: users },
  })
    .populate([
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
    ])
    .exec((error, result) => {
      //if no conversation found
      //create it

      if (error == null && result == null) {
        conversation
          .save()
          .then((conv) => {
            conv
              .populate([
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
              ])
              .execPopulate()
              .then((newConversation) => res.status(200).json(newConversation));
          })
          .catch((err) => res.status(500).json(err));
      } else if (error == null && result != null) res.status(200).json(result);
      else res.status(500).json(error);
    });
};

export const addToConversation = (req: Request, res: Response): void => {
  const userToAdd: User = req.body.userToAdd;
  const idConv: string = req.params.id;
  Conversations.findOne({
    _id: idConv,
  })
    .then((conv) => {
      Users.findOne({
        _id: userToAdd,
      })
        .then((user) => {
          conv.receivers.push(user);
          user.conversations.push(conv);
          // { $addToSet: {conversations: conv} } unique values in nested array of objects
          Conversations.updateOne(
            { _id: conv._id },
            {
              $set: conv,
            },
          ).then(() => {
            Users.updateOne(
              { _id: user._id },
              {
                $set: user,
              },
            ).then(() => {
              res.status(200).json(conv);
            });
          });
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

export const deleteOne = (req: Request, res: Response): void => {
  Conversations.deleteOne({
    _id: req.params.id,
  })
    .then((conversation) => {
      res.status(200).json(conversation);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

import { Users, User } from '../models/user';
import { Messages, Message } from '../models/message';
import { Conversations, Conversation } from '../models/conversation';
import { hashVal } from '../functions/others';

export const createMessage = async (mess: Message): Promise<Message> =>
  // create message with socket io emit
  new Messages({ ...mess })
    .save()
    .then((message) => {
      return message.populate({ path: 'sender', select: { lastName: 1, firstName: 1, avatar: 1 } }).execPopulate();
    })
    .catch((err) => {
      throw 'error when attempting to create a message: ' + err;
    });

export const createConvSocket = async (id: string, users: Array<User>): Promise<Conversation> =>
  new Conversations({ _id: id, receivers: users })
    .save()
    .then((conv) => {
      return conv;
    })
    .catch((err) => {
      throw 'error when attempting to create a conversation' + err;
    });

export const getAllConvUser = async (id: string): Promise<Conversation[]> =>
  Users.findOne({ _id: id })
    .then((user) => {
      return user.conversations;
    })
    .catch((err) => {
      throw 'error when attempting to get all conversations from user' + err;
    });

export const getConversation = async (conversation: Conversation): Promise<Conversation> =>
  Conversations.findOne({ _id: conversation })
    .then((conv) => {
      return conv;
    })
    .catch((err) => {
      throw 'error when attempting to get conversation' + err;
    });

export const checkConvExist = async (id: string): Promise<boolean> =>
  Conversations.find({ _id: id })
    .then((checkConv) => {
      return typeof checkConv !== 'undefined' && checkConv.length > 0 ? true : false;
    })
    .catch((err) => {
      throw 'Error when attempting to check if conversation exist' + err;
    });

export const updateConv = async (conversation: Conversation): Promise<Conversation> =>
  Conversations.updateOne(
    { _id: conversation._id },
    {
      $set: conversation,
    },
  )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw 'Error when attempting to update conversation' + error;
    });

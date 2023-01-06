import { RestConversationUser, toConversationUser } from '../restChat/RestConversationUser';

import { Message, TypeMessage } from '@/domain/chat/Message';

export interface RestSocketMessage {
  _id: string;
  conversationID: string;
  sender: RestConversationUser;
  message: string;
  type: string;
}

export const toTypeMessage = (restTypeMessage: string): TypeMessage => {
  if (restTypeMessage == 'file') return TypeMessage.file;
  if (restTypeMessage == 'gif') return TypeMessage.gif;
  if (restTypeMessage == 'image') return TypeMessage.image;
  return TypeMessage.message;
};

export const fromSocketMessagetoMessage = (restMessage: RestSocketMessage): Message => ({
  id: restMessage._id,
  conversationID: restMessage.conversationID,
  sender: toConversationUser(restMessage.sender),
  content: restMessage.message,
  type: toTypeMessage(restMessage.type),
});

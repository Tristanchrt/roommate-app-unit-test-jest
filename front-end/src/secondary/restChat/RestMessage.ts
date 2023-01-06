import { toTypeMessage } from '../restSocket/RestSocketMessage';

import { RestConversationUser, toConversationUser } from './RestConversationUser';

import { Message } from '@/domain/chat/Message';

export interface RestMessage {
  _id: string;
  conversationID: string;
  sender: RestConversationUser;
  message: string;
  date: Date;
  type: string;
  seeOrNot: boolean;
}

export const toMessage = (restMessage: RestMessage): Message => ({
  id: restMessage._id,
  conversationID: restMessage.conversationID,
  sender: toConversationUser(restMessage.sender),
  content: restMessage.message,
  type: toTypeMessage(restMessage.type),
});

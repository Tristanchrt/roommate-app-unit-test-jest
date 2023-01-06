import { RestUser, toUser } from '../restAccount/RestUser';

import { RestConversationUser, toConversationUser } from './RestConversationUser';
import { RestMessage, toMessage } from './RestMessage';

import { Conversation } from '@/domain/chat/Conversation';

export interface RestConversation {
  _id: string;
  messages: Array<RestMessage>;
  receivers: Array<RestConversationUser>;
  createdAt: Date;
}

export const toConversation = (restConversation: RestConversation): Conversation => ({
  id: restConversation._id,
  users: restConversation.receivers.map(restUser => toConversationUser(restUser)),
  messages: restConversation.messages.map(restMessage => toMessage(restMessage)),
});

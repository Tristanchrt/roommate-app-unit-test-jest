import { ConversationUser } from '@/domain/chat/ConversationUser';

export interface RestConversationUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export const toConversationUser = (restConversationUser: RestConversationUser): ConversationUser => ({
  id: restConversationUser._id,
  firstName: restConversationUser.firstName,
  lastName: restConversationUser.lastName,
  picture: restConversationUser.avatar ? restConversationUser.avatar : '',
});

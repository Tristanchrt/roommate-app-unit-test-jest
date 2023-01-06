import { User } from '../account/User';

import { ConversationUser } from './ConversationUser';
import { Message } from './Message';

export interface Conversation {
  id: string;
  users: Array<ConversationUser>;
  messages: Array<Message>;
}

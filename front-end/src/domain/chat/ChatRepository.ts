import { Conversation } from './Conversation';
import { ConversationUser } from './ConversationUser';
import { Message } from './Message';

export interface ChatRepository {
  createConversation(usersID: Array<string>): Promise<Conversation>;
  getConversations(): Promise<Array<Conversation>>;
  getConversation(id: string): Promise<Conversation>;
}

import { ConversationUser } from './ConversationUser';

export enum TypeMessage {
  message = 'message',
  file = 'file',
  gif = 'gif',
  image = 'image',
}
export interface Message {
  id: string;
  conversationID: string;
  sender: ConversationUser;
  content: string;
  type: TypeMessage;
}

export interface NewMessage {
  conversationID: string;
  senderID: string;
  content: string;
  type: TypeMessage;
}

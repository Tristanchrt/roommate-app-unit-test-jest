import { Message, NewMessage } from '../chat/Message';

export interface SocketRepository {
  sendMessage(message: NewMessage): boolean;
  uploadFile(message: NewMessage, file: Blob): Promise<Message>;
  init(): any;
  destroy(): any;
}

import { AxiosInstance, AxiosResponse } from 'axios';

import { RestMessage, toMessage } from '../restChat/RestMessage';

import { RestSocketMessage, fromSocketMessagetoMessage } from './RestSocketMessage';

import { ConversationUser } from '@/domain/chat/ConversationUser';
import { Message, NewMessage } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';

export default class RestSocketRepository implements SocketRepository {
  private storeRepository: StoreRepository;
  private socket: SocketIOClient.Socket;
  private axiosInstance: AxiosInstance;
  constructor(socket: SocketIOClient.Socket, axiosInstance: AxiosInstance, storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
    this.socket = socket;
    this.axiosInstance = axiosInstance;
  }
  public init() {
    if (this.storeRepository.user().getUser() == null) return;
    const userID: string = this.storeRepository.user().getUser().id;
    this.socket.connect();
    /* istanbul ignore next */
    this.socket.on('connect', () => {
      this.socket.emit('CONNECTION', userID);
      this.listenForMessages();
    });
  }

  public destroy() {
    this.socket.disconnect();
  }

  /* istanbul ignore next */
  private listenForMessages() {
    this.socket.on('MESSAGE', (restMessageJSON: string) => {
      const message = fromSocketMessagetoMessage(JSON.parse(restMessageJSON));
      this.storeRepository.socket().setLastestMessage(message);
    });
  }

  public sendMessage(message: NewMessage): boolean {
    const restMessage = {
      conversationID: message.conversationID,
      sender: message.senderID,
      message: message.content,
      type: 'text',
    };
    this.socket.emit('SEND_MESSAGE', restMessage);
    return true;
  }
  public uploadFile(message: NewMessage, file: Blob): Promise<Message> {
    const restMessage = { conversationID: message.conversationID, type: message.type, message: message.content, sender: message.senderID };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', JSON.stringify(restMessage));

    return this.axiosInstance
      .post('/user/message/uploadFile', formData, {
        headers: {
          Authorization: this.storeRepository.user().getToken(),
        },
      })
      .then((response: AxiosResponse<RestMessage>) => {
        this.socket.emit('SEND_MESSAGE', response.data);
        return toMessage(response.data);
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }
}

import { AxiosInstance, AxiosResponse } from 'axios';

import { RestConversation, toConversation } from './RestConversation';

import { ChatRepository } from '@/domain/chat/ChatRepository';
import { Conversation } from '@/domain/chat/Conversation';
import { StoreRepository } from '@/domain/store/StoreRepository';

export default class RestChatRepository implements ChatRepository {
  private axiosInstance: AxiosInstance;
  private storeRepository: StoreRepository;
  constructor(storeRepository: StoreRepository, axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.storeRepository = storeRepository;
  }

  createConversation(usersID: Array<string>): Promise<Conversation> {
    return this.axiosInstance
      .post(
        '/user/conversation/',
        {
          users: usersID,
        },
        {
          headers: {
            Authorization: this.storeRepository.user().getToken(),
          },
        }
      )
      .then((response: AxiosResponse<RestConversation>) => toConversation(response.data))
      .catch(error => {
        throw new Error(error.message);
      });
  }
  getConversation(id: string): Promise<Conversation> {
    return this.axiosInstance
      .get(`/user/conversation/${id}`, {
        headers: {
          Authorization: this.storeRepository.user().getToken(),
        },
      })
      .then((response: AxiosResponse<RestConversation>) => toConversation(response.data))
      .catch(error => {
        throw new Error(error.message);
      });
  }

  getConversations(): Promise<Conversation[]> {
    return this.axiosInstance
      .get('/user/conversations', {
        headers: {
          Authorization: this.storeRepository.user().getToken(),
        },
      })
      .then((response: AxiosResponse<RestConversation[]>) => response.data.map(resp => toConversation(resp)))
      .catch(error => {
        throw new Error(error.message);
      });
  }
}

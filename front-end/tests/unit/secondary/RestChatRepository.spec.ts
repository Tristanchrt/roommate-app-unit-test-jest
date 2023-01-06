import { joe, tristan } from '../fixtures/account/Account.fixture';
import {
  conversationFranckTristan,
  conversationFranckTristanJoe,
  restConversationFranckTristan,
  restConversationFranckTristanJoe,
} from '../fixtures/chat/Conversation.fixture';
import { resolveStoreRepository } from '../fixtures/store/StoreRepository.fixture';
import { customError, stubAxiosInstance } from '../Utils';

import RestChatRepository from '@/secondary/restChat/RestChatRepository';

describe('RestChatRepository', () => {
  it('Should fail to create a conversation', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.post.rejects(customError(500, "Can't get account: Network Error"));
    const restChatRepository = new RestChatRepository(storeRepository, axiosInstance);

    await restChatRepository.createConversation([tristan.id, joe.id]).catch(error => {
      expect(error).toEqual(Error("Can't get account: Network Error"));
    });
  });
  it('Should correctly create a conversation', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.post.resolves({ data: restConversationFranckTristanJoe });
    const storeRepository = resolveStoreRepository();
    const axiosPost = jest.spyOn(axiosInstance, 'post');

    const restChatRepository = new RestChatRepository(storeRepository, axiosInstance);

    const params: Array<string> = [tristan.id, joe.id];
    const conversation = await restChatRepository.createConversation(params);

    expect(axiosPost).toBeCalledWith(
      '/user/conversation/',
      {
        users: params,
      },
      {
        headers: {
          Authorization: storeRepository.user().getToken(),
        },
      }
    );

    expect(conversation).toEqual(conversationFranckTristanJoe);
  });
  it('Should fail to get a conversation', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.get.rejects(customError(500, "Can't get account: Network Error"));
    const restChatRepository = new RestChatRepository(storeRepository, axiosInstance);

    await restChatRepository.getConversation('someConversationId').catch(error => {
      expect(error).toEqual(Error("Can't get account: Network Error"));
    });
  });
  it('Should retrieve correct conversation', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: restConversationFranckTristan });
    const storeRepository = resolveStoreRepository();
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    const restChatRepository = new RestChatRepository(storeRepository, axiosInstance);

    const conversation = await restChatRepository.getConversation('someConversationId');

    expect(axiosGet).toBeCalledWith('/user/conversation/someConversationId', {
      headers: {
        Authorization: storeRepository.user().getToken(),
      },
    });

    expect(conversation).toEqual(conversationFranckTristan);
  });
  it('Should fail to get all conversations', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.get.rejects(customError(500, "Can't get account: Network Error"));
    const restChatRepository = new RestChatRepository(storeRepository, axiosInstance);

    await restChatRepository.getConversations().catch(error => {
      expect(error).toEqual(Error("Can't get account: Network Error"));
    });
  });
  it('Should retrieve all conversations from a user', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [restConversationFranckTristan, restConversationFranckTristanJoe] });
    const storeRepository = resolveStoreRepository();
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    const restChatRepository = new RestChatRepository(storeRepository, axiosInstance);

    const conversations = await restChatRepository.getConversations();

    expect(axiosGet).toBeCalledWith('/user/conversations', {
      headers: {
        Authorization: storeRepository.user().getToken(),
      },
    });

    expect(conversations).toEqual([conversationFranckTristan, conversationFranckTristanJoe]);
  });
});

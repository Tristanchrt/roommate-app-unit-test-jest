import sinon, { SinonStub } from 'sinon';

import { AxiosError } from 'axios';

import { customError } from '../../../unit/Utils';

import { conversationFranckTristan, conversationFranckTristanJoe } from './Conversation.fixture';
import { messageFranckTristan, messageTristanFranck } from './Message.fixture';

import { ChatRepository } from '@/domain/chat/ChatRepository';

interface RestChatRepositoryStub extends ChatRepository {
  createConversation: SinonStub;
  getConversations: SinonStub;
  getConversation: SinonStub;
}
export const stubChatRepository = (): RestChatRepositoryStub => ({
  createConversation: sinon.stub(),
  getConversations: sinon.stub(),
  getConversation: sinon.stub(),
});

export const resolveChatRepository = (): RestChatRepositoryStub => {
  const chatRepository = stubChatRepository();
  chatRepository.getConversations.resolves([conversationFranckTristan, conversationFranckTristanJoe]);
  chatRepository.getConversation.resolves(conversationFranckTristan);
  chatRepository.createConversation.resolves(conversationFranckTristanJoe);
  return chatRepository;
};

export const rejectChatRepository = (overrideError?: AxiosError): RestChatRepositoryStub => {
  const error = overrideError ? overrideError : customError(500, 'Network Error.');
  const chatRepository = stubChatRepository();
  chatRepository.getConversations.rejects(error);
  chatRepository.getConversation.rejects(error);
  chatRepository.createConversation.rejects(error);
  return chatRepository;
};

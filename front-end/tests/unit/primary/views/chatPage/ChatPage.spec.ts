import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { franck } from '../../../fixtures/account/Account.fixture';
import { rejectChatRepository, resolveChatRepository, stubChatRepository } from '../../../fixtures/chat/ChatRepository.fixture';
import { conversationFranckTristan, conversationFranckTristanJoe } from '../../../fixtures/chat/Conversation.fixture';
import { messageFranckTristan } from '../../../fixtures/chat/Message.fixture';
import { stubSocketRepository } from '../../../fixtures/chat/RestSocketRepository.fixture';
import { resolveRoutesController, stubRoutesController } from '../../../fixtures/RoutesController.fixture';
import { resolveStoreRepository, stubStoreRepository } from '../../../fixtures/store/StoreRepository.fixture';
import { customError, flushPromises, stubRouter } from '../../../Utils';

import { ChatRepository } from '@/domain/chat/ChatRepository';
import { Message } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import RoutesController from '@/primary/utils/RoutesController';
import { ChatPageComponent, ChatPageVue } from '@/primary/views/chatPage';
import RestStoreRepository from '@/secondary/store/RestStoreRepository';

let wrapper: Wrapper<ChatPageComponent>;
let component: ChatPageComponent;
let setWindowWidth = jest.fn();

const $router: VueRouter = stubRouter({
  routes: [
    {
      path: '/messages/:id?',
      name: 'Chat',
      component: ChatPageVue,
    },
  ],
});

const $route: Partial<Route> = {
  params: {},
};
const $routeWithParams: Partial<Route> = {
  params: {
    id: 'someConversationId',
  },
};

interface WapParams {
  overrideRoute?: Partial<Route>;
  overrideChatRepository?: ChatRepository;
  overrideStoreRepository?: StoreRepository;
  overrideSocketRepository?: SocketRepository;
  overrideRoutesController?: RoutesController;
}

const wrap = (params?: WapParams) => {
  const chatRepository = params?.overrideChatRepository ? params?.overrideChatRepository : resolveChatRepository();
  const storeRepository = params?.overrideStoreRepository ? params?.overrideStoreRepository : resolveStoreRepository();
  const socketRepository = params?.overrideSocketRepository ? params?.overrideSocketRepository : stubSocketRepository();
  const routesController = params?.overrideRoutesController ? params?.overrideRoutesController : resolveRoutesController();
  const finalRoute = params?.overrideRoute ? params?.overrideRoute : $route;
  wrapper = shallowMount<ChatPageComponent>(ChatPageVue, {
    mocks: {
      $router: $router,
      $route: finalRoute,
    },
    provide: {
      storeRepository: () => storeRepository,
      chatRepository: () => chatRepository,
      socketRepository: () => socketRepository,
      routesController: () => routesController,
    },
  });
  component = wrapper.vm;
};

describe('Chat page', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should redirect to sign in page on load if no user connected', () => {
    const storeRepository = stubStoreRepository();
    const routesController = stubRoutesController();
    routesController.isUserAuthenticated.returns(false);
    const isUserAuthenticated = jest.spyOn(routesController, 'isUserAuthenticated');
    storeRepository.user().getUser.returns(null);
    wrap({
      overrideRoute: $route,
      overrideChatRepository: resolveChatRepository(),
      overrideStoreRepository: storeRepository,
      overrideRoutesController: routesController,
    });

    expect(component.user).toBe(undefined);
    expect(isUserAuthenticated).toBeCalled();
    expect($router.push).toBeCalledWith({ name: 'SignIn' });
  });
  it('Should try to get a conversation on load if an id is set in URL', async () => {
    const chatRepository = resolveChatRepository();
    const getConversation = jest.spyOn(chatRepository, 'getConversation');
    wrap({ overrideRoute: $routeWithParams, overrideChatRepository: chatRepository });

    expect(getConversation).toBeCalled();
  });
  it('Should load all conversations from user on load', async () => {
    const conversations = [conversationFranckTristan, conversationFranckTristanJoe];
    const chatRepository = stubChatRepository();
    const storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(franck);
    chatRepository.getConversations.resolves(conversations);
    wrap({ overrideRoute: $route, overrideChatRepository: chatRepository, overrideStoreRepository: storeRepository });

    expect(chatRepository.getConversations.called).toBeTruthy();
    expect(storeRepository.user().getUser.called).toBeTruthy();

    await flushPromises();

    expect(component.conversations).toEqual(conversations);
    expect(component.loading).toBe(false);
    expect(component.user).toEqual(franck);
  });
  it('Should fail to load all conversations from user on load when an error occurs', async () => {
    const chatRepository = rejectChatRepository();
    wrap({ overrideRoute: $route, overrideChatRepository: chatRepository });

    expect(chatRepository.getConversations.called).toBeTruthy();

    await flushPromises();

    expect(component.conversations).toEqual([]);
    expect($router.push).toBeCalledWith({ name: 'Chat' });
  });
  it('Should correctly select a conversation', async () => {
    const chatRepository = stubChatRepository();
    chatRepository.getConversations.resolves([conversationFranckTristan, conversationFranckTristanJoe]);
    chatRepository.getConversation.resolves(conversationFranckTristan);
    const getConversation = jest.spyOn(chatRepository, 'getConversation');
    wrap({ overrideRoute: $route, overrideChatRepository: chatRepository });

    component.currentConversation = conversationFranckTristanJoe;
    component.selectConversation(conversationFranckTristan.id);

    expect(component.loading).toBe(true);
    expect(component.currentConversation).toBeNull();
    expect(getConversation).toBeCalledWith(conversationFranckTristan.id);

    await flushPromises();

    expect(component.currentConversation).toEqual(conversationFranckTristan);
    expect(component.loading).toBe(false);
    expect($router.push).toBeCalledWith({ name: 'Chat', params: { id: conversationFranckTristan.id } });
  });
  it('Should fail to select conversation if error occurs', async () => {
    const chatRepository = stubChatRepository();
    chatRepository.getConversations.resolves([conversationFranckTristan, conversationFranckTristanJoe]);
    chatRepository.getConversation.rejects(customError(500, 'network error'));
    const getConversation = jest.spyOn(chatRepository, 'getConversation');
    wrap({ overrideRoute: $route, overrideChatRepository: chatRepository });

    component.selectConversation(conversationFranckTristan.id);
    expect(getConversation).toBeCalledWith(conversationFranckTristan.id);

    await flushPromises();

    expect($router.push).toBeCalledWith({ name: 'Chat' });
  });
  it('Should not be able to select a conversation if a converation is still loading', () => {
    const chatRepository = stubChatRepository();
    chatRepository.getConversations.resolves([conversationFranckTristan, conversationFranckTristanJoe]);
    chatRepository.getConversation.resolves(conversationFranckTristan);
    const getConversation = jest.spyOn(chatRepository, 'getConversation');
    wrap({ overrideRoute: $route, overrideChatRepository: chatRepository });

    component.conversationLoading = true;
    component.selectConversation(conversationFranckTristanJoe.id);

    expect(getConversation).not.toBeCalled();
  });
  it('Should watch for a new message and add it to conversation', async () => {
    const chatRepository = resolveChatRepository();
    const storeRepository = new RestStoreRepository();
    storeRepository.user().setUser(franck);
    wrap({ overrideRoute: $route, overrideChatRepository: chatRepository, overrideStoreRepository: storeRepository });

    component.conversations = [conversationFranckTristan, conversationFranckTristanJoe];
    component.currentConversation = conversationFranckTristan;
    const setLastestMessage = jest.spyOn(component, 'setLastestMessage');
    const newMessage: Message = { ...messageFranckTristan, content: 'some new message' };

    await component.$nextTick();
    storeRepository.socket().setLastestMessage(newMessage);
    await component.$nextTick();

    expect(setLastestMessage).toBeCalledWith(newMessage);
    expect(component.conversations[0].messages).toContain(newMessage);
    expect(component.currentConversation.messages).toContain(newMessage);
  });
  it('Should listen to screen resize', () => {
    window = Object.assign(window, { innerWidth: 951 });
    window.dispatchEvent(new Event('resize'));
    const addEventListener = jest.spyOn(window, 'addEventListener');
    wrap();

    expect(component.windowWidth).toBe(951);
    expect(addEventListener).toBeCalledWith('resize', expect.any(Function));
  });
  it('Should correctly get window width', () => {
    wrap();

    window = Object.assign(window, { innerWidth: 951 });
    window.dispatchEvent(new Event('resize'));
    expect(component.windowWidth).toBe(951);
    expect(component.device).toBe('desktop');

    window = Object.assign(window, { innerWidth: 551 });
    window.dispatchEvent(new Event('resize'));
    expect(component.windowWidth).toBe(551);
    expect(component.device).toBe('tablet');

    window = Object.assign(window, { innerWidth: 550 });
    window.dispatchEvent(new Event('resize'));
    expect(component.windowWidth).toBe(550);
    expect(component.device).toBe('mobile');
  });
  it('Sould correclty remove listener on component destroyed', () => {
    wrap();

    const removeEventListener = jest.spyOn(window, 'removeEventListener');
    component.$destroy();
    expect(removeEventListener).toBeCalledWith('resize', expect.any(Function));
  });
});

import sinon from 'sinon';

import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { franck } from '../../../fixtures/account/Account.fixture';
import { resolveChatRepository, stubChatRepository } from '../../../fixtures/chat/ChatRepository.fixture';
import { conversationFranckTristanJoe } from '../../../fixtures/chat/Conversation.fixture';
import { stubSocketRepository } from '../../../fixtures/chat/RestSocketRepository.fixture';
import { resolveModalController } from '../../../fixtures/ModalController.fixture';
import { resolveStoreRepository } from '../../../fixtures/store/StoreRepository.fixture';
import { stubRouter } from '../../../Utils';

import { UserPreview } from '@/domain/account/User';
import { ChatRepository } from '@/domain/chat/ChatRepository';
import { NewMessage, TypeMessage } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { UserCardComponent, UserCardVue } from '@/primary/components/match/userCard';
import { UserModalComponent, UserModalVue } from '@/primary/components/match/userModal';
import ModalController from '@/primary/utils/ModalController';

const franckPreview: UserPreview = {
  id: 'franckId',
  name: 'FranckDsf',
  firstName: 'Franck',
  lastName: 'Desfrançais',
  picture: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  filters: [],
  rating: 2.3,
  birthDate: new Date('11/11/1999'),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue diam orci, at tincidunt lacus iaculis ac. Duis nec orci a est bibendum faucibus eu eu mi. Aenean dapibus risus pharetra ante sollicitudin, et efficitur tortor pretium. Nam tortor tellus, elementum ut ullamcorper iaculis, fermentum tempus neque.',
};

let wrapper: Wrapper<UserModalComponent>;
let component: UserModalComponent;
let $router: VueRouter = stubRouter();

interface WrapParams {
  overrideModalController?: ModalController;
  overrideChatRepository?: ChatRepository;
  overrideSocketRepository?: SocketRepository;
  overrideStoreRepository?: StoreRepository;
}
const wrap = (params?: WrapParams) => {
  const modalController = params?.overrideModalController ? params?.overrideModalController : resolveModalController();
  const chatRepository = params?.overrideChatRepository ? params?.overrideChatRepository : resolveChatRepository();
  const socketRepository = params?.overrideSocketRepository ? params?.overrideSocketRepository : resolveModalController();
  const storeRepository = params?.overrideStoreRepository ? params?.overrideStoreRepository : resolveStoreRepository();
  wrapper = shallowMount<UserModalComponent>(UserModalVue, {
    provide: {
      modalController: () => modalController,
      chatRepository: () => chatRepository,
      socketRepository: () => socketRepository,
      storeRepository: () => storeRepository,
    },
    propsData: {
      user: franckPreview,
    },
    mocks: {
      $router: $router,
    },
  });
  component = wrapper.vm;
};

describe('UserModal component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Should correctly display the user's age", () => {
    const ageChecker = (date: Date): number => {
      var diff = date.getTime() - franckPreview.birthDate.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    wrap();

    expect(franckPreview.birthDate).toEqual(new Date('11/11/1999'));
    expect(component.age).toEqual(ageChecker(new Date()));
  });
  it('Should correctly close modal', () => {
    const modalController = resolveModalController();
    const closeModal = jest.spyOn(modalController, 'close');
    wrap({ overrideModalController: modalController });

    component.close();

    expect(closeModal).toBeCalled();
  });
  it('Should set textArea automatically on input', async () => {
    wrap();

    component.input = 'some input with\ntext space\n.';
    component.setTextAreaHeight();
    const textArea: any = component.$el.querySelector('#input');

    await component.$nextTick();
    expect(textArea.style.height).toBe(`${textArea.scrollHeight}px`);
  });
  it('Should correctly send message', async () => {
    $router = stubRouter();
    const chatRepository = stubChatRepository();
    chatRepository.createConversation.resolves(conversationFranckTristanJoe);
    const storeRepository = resolveStoreRepository();
    const socketRepository = stubSocketRepository();
    wrap({ overrideChatRepository: chatRepository, overrideStoreRepository: storeRepository, overrideSocketRepository: socketRepository });

    const setTextAreaHeight = jest.spyOn(component, 'setTextAreaHeight');
    const createConversation = jest.spyOn(chatRepository, 'createConversation');
    const socketSendMessage = jest.spyOn(socketRepository, 'sendMessage');

    component.input = 'test';
    const message: NewMessage = {
      conversationID: conversationFranckTristanJoe!.id,
      senderID: storeRepository.user().getUser().id,
      content: component.input,
      type: TypeMessage.message,
    };

    await component.sendMessage();
    expect($router.push).toBeCalledWith({ name: 'Chat', params: { id: conversationFranckTristanJoe!.id } });
    expect(createConversation).toBeCalledWith([component.user.id]);
    expect(socketSendMessage).toBeCalledWith(message);
    expect(component.input).toBe('');
    expect(setTextAreaHeight).toBeCalled();
  });
});

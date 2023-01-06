import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { franck } from '../../../fixtures/account/Account.fixture';
import { conversationFranckTristan, conversationFranckTristanJoe } from '../../../fixtures/chat/Conversation.fixture';
import { stubSocketRepository } from '../../../fixtures/chat/RestSocketRepository.fixture';
import { stubRouter } from '../../../Utils';

import { Conversation } from '@/domain/chat/Conversation';
import { Message, NewMessage, TypeMessage } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { ConversationComponent, ConversationVue } from '@/primary/components/chat/conversation';

let wrapper: Wrapper<ConversationComponent>;
let component: ConversationComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = (overrideConversation?: Conversation | null, overrideSocketRepository?: SocketRepository) => {
  const conversation = overrideConversation ? overrideConversation : null;
  const socketRepository = overrideSocketRepository ? overrideSocketRepository : stubSocketRepository();
  wrapper = shallowMount<ConversationComponent>(ConversationVue, {
    provide: {
      socketRepository: () => socketRepository,
    },
    mocks: {
      $router: $router,
      $route: $route,
    },
    propsData: {
      conversation: conversation,
      user: franck,
    },
  });
  component = wrapper.vm;
};

const addMessagesToConversation = (conversation: Conversation): Conversation => {
  let i = 0;

  while (i < 100) {
    const message: Message = {
      id: 'messageID_' + i,
      conversationID: conversation.id,
      sender: conversation.users[0],
      content: 'Bof la faut que je fasse un test covid ;)',
      type: TypeMessage.message,
    };
    conversation.messages.push(message);
    i++;
  }
  return conversation;
};

describe('Conversation component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly set component as loading when no conversation imported', () => {
    wrap();

    expect(component.loading).toBeTruthy();

    wrapper.setProps({ conversation: conversationFranckTristanJoe });

    expect(component.loading).toBeFalsy();
  });
  it('Should set textArea automatically on input', async () => {
    wrap(conversationFranckTristanJoe);

    component.input = 'some input with\ntext space\n.';
    component.setTextAreaHeight();
    const textArea: any = component.$el.querySelector('#input');

    await component.$nextTick();
    expect(textArea.style.height).toBe(`${textArea.scrollHeight}px`);
  });
  it('Should scroll if component finished loading', async () => {
    wrap();
    const scrollToBottom = jest.spyOn(component, 'scrollToBottom');
    component.scrollIfConditionsFulFilled = jest.fn();

    wrapper.setProps({ conversation: conversationFranckTristan });
    await component.$nextTick();
    expect(scrollToBottom).toBeCalledTimes(1);

    wrapper.setProps({ conversation: null });
    await component.$nextTick();

    expect(scrollToBottom).toBeCalledTimes(1);
  });
  it('Should watch for scroll if conversation changed & conditions fullfilled', async () => {
    wrap();
    const scrollIfConditionsFulFilled = jest.spyOn(component, 'scrollIfConditionsFulFilled');
    await component.$nextTick();

    expect(scrollIfConditionsFulFilled).toBeCalledTimes(0);

    await component.$nextTick();
    wrapper.setProps({ conversation: conversationFranckTristan });
    await component.$nextTick();

    expect(scrollIfConditionsFulFilled).toBeCalledTimes(1);

    await component.$nextTick();
    wrapper.setProps({ conversation: null });
    await component.$nextTick();

    expect(scrollIfConditionsFulFilled).toBeCalledTimes(1);
  });
  it('Should correctly scroll to bottom', () => {
    const conversation = addMessagesToConversation(conversationFranckTristan);
    wrap(conversation);

    component.scrollToBottom();
    const conversationContainer = component.$el.querySelector('#conversation');

    expect(conversationContainer!.scrollTop).toBe(conversationContainer!.scrollHeight);
  });
  it('Should trigger select file on button click', async () => {
    wrap(conversationFranckTristanJoe);

    await component.$nextTick();

    const fileSelector: HTMLFormElement = component.$refs.file as HTMLFormElement;
    const fileSelectorClick = jest.spyOn(fileSelector, 'click');
    component.selectFile();

    expect(fileSelectorClick).toBeCalledTimes(1);
  });
  it('Should reset inputContainer on message sent', () => {
    const socketRepository = stubSocketRepository();
    wrap(conversationFranckTristan, socketRepository);

    const setTextAreaHeight = jest.spyOn(component, 'setTextAreaHeight');
    const socketSendMessage = jest.spyOn(socketRepository, 'sendMessage');

    component.input = 'test';
    const newMessage: NewMessage = {
      conversationID: component.conversation!.id,
      senderID: component.user.id,
      content: component.input,
      type: TypeMessage.message,
    };
    component.sendMessage();
    expect(component.input).toBe('');
    expect(setTextAreaHeight).toBeCalled();
    expect(socketSendMessage).toBeCalledWith(newMessage);
  });
  it('Should reset fileSelector on file message sent', async () => {
    const socketRepository = stubSocketRepository();
    wrap(conversationFranckTristanJoe, socketRepository);

    await component.$nextTick();

    const fileSelector: HTMLFormElement = component.$refs.file as HTMLFormElement;
    component.input = 'someInput';
    fileSelector.nodeValue = 'test';
    const newMessage: NewMessage = {
      conversationID: component.conversation!.id,
      senderID: component.user.id,
      content: component.input,
      type: TypeMessage.file,
    };
    const socketRepositoryUploadFile = jest.spyOn(socketRepository, 'uploadFile');

    component.sendFile();

    expect(socketRepositoryUploadFile).toBeCalledWith(newMessage, fileSelector.files[0]);
    expect(fileSelector.nodeValue).toBeNull();
  });
  it('Should scroll if user scrolled to bottom', async () => {
    wrap(addMessagesToConversation(conversationFranckTristan));
    const scrollToBottom = jest.spyOn(component, 'scrollToBottom');
    ((component.$el.querySelector = jest.fn()) as jest.Mock).mockReturnValue({
      scrollHeight: 1250,
      scrollTop: 0,
      clientHeight: 1000,
    });

    await component.$nextTick();
    component.scrollIfConditionsFulFilled();
    expect(scrollToBottom).not.toBeCalled();

    ((component.$el.querySelector = jest.fn()) as jest.Mock).mockRestore();
    ((component.$el.querySelector = jest.fn()) as jest.Mock).mockReturnValue({
      scrollHeight: 1250,
      scrollTop: 1000,
      clientHeight: 1000,
    });
    component.scrollIfConditionsFulFilled();
    expect(scrollToBottom).toBeCalled();
  });
});

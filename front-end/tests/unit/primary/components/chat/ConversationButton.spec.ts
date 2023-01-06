import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { tristan } from '../../../fixtures/account/Account.fixture';
import { conversationFranckTristanJoe } from '../../../fixtures/chat/Conversation.fixture';
import {
  claraFromConversation,
  franckFromConversation,
  joeFromConversation,
  tristanFromConversation,
} from '../../../fixtures/chat/ConversationUser.fixture';
import { stubRouter } from '../../../Utils';

import { Message } from '@/domain/chat/Message';
import { ConversationButtonComponent, ConversationButtonVue } from '@/primary/components/chat/conversationButton';

let wrapper: Wrapper<ConversationButtonComponent>;
let component: ConversationButtonComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = () => {
  wrapper = shallowMount<ConversationButtonComponent>(ConversationButtonVue, {
    mocks: {
      $router: $router,
      $route: $route,
    },
    propsData: {
      conversation: conversationFranckTristanJoe,
      user: tristan,
    },
  });
  component = wrapper.vm;
};

describe('ConversationButton component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly display conversation name', () => {
    wrap();

    const name: string = component.name();
    const comparator: string =
      franckFromConversation.firstName +
      ' ' +
      franckFromConversation.lastName +
      ', ' +
      joeFromConversation.firstName +
      ' ' +
      joeFromConversation.lastName;

    expect(name).toBe(comparator);
  });

  it('Should correctly display content preview from conversation', () => {
    wrap();
    const content: string = component.content();
    expect(content).toBe(conversationFranckTristanJoe.messages[conversationFranckTristanJoe.messages.length - 1].content);

    component.conversation.messages = new Array<Message>();
    const contentNull: string = component.content();
    expect(contentNull).toBe('');
  });

  it('Should correctly display images from conversation', () => {
    wrap();
    let images: Array<string> = component.images();
    expect(images).toEqual([
      component.senderPicture(franckFromConversation),
      component.senderPicture(tristanFromConversation),
      component.senderPicture(joeFromConversation),
    ]);

    component.conversation.users = [franckFromConversation, tristanFromConversation, joeFromConversation, claraFromConversation];
    images = component.images();
    const comparator: Array<string> = [
      component.senderPicture(franckFromConversation),
      component.senderPicture(joeFromConversation),
      component.senderPicture(claraFromConversation),
    ];

    expect(images).toEqual(comparator);
  });
  it('Should correctly point towards cdn picture', () => {
    wrap();

    const result = component.senderPicture(franckFromConversation);
    expect(result).toBe(`http://localhost:4000/api/user/avatar/${franckFromConversation.id}/${franckFromConversation.picture}`);
  });
});

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

import { ConversationHeaderComponent, ConversationHeaderVue } from '@/primary/components/chat/conversationHeader';

let wrapper: Wrapper<ConversationHeaderComponent>;
let component: ConversationHeaderComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = () => {
  wrapper = shallowMount<ConversationHeaderComponent>(ConversationHeaderVue, {
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

describe('ConversationHeader component', () => {
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

  it('Should correctly display images from conversation', () => {
    wrap();
    let images: Array<string> = component.images();
    expect(images).toEqual([franckFromConversation.picture, tristanFromConversation.picture, joeFromConversation.picture]);

    component.conversation.users = [franckFromConversation, tristanFromConversation, joeFromConversation, claraFromConversation];
    images = component.images();
    const comparator: Array<string> = [franckFromConversation.picture, joeFromConversation.picture, claraFromConversation.picture];

    expect(images).toEqual(comparator);
  });
});

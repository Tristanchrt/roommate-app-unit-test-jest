import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { messageFranckTristanJoe } from '../../../fixtures/chat/Message.fixture';
import { stubRouter } from '../../../Utils';

import { MessageComponent, MessageVue } from '@/primary/components/chat/message';

let wrapper: Wrapper<MessageComponent>;
let component: MessageComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = () => {
  wrapper = shallowMount<MessageComponent>(MessageVue, {
    mocks: {
      $router: $router,
      $route: $route,
    },
    propsData: {
      message: messageFranckTristanJoe,
      isReceived: false,
    },
  });
  component = wrapper.vm;
};

describe('Message component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly create sender from firstname & lastname', () => {
    wrap();

    const sender: string = component.sender();

    expect(sender).toBe(messageFranckTristanJoe.sender.firstName + ' ' + messageFranckTristanJoe.sender.lastName);
  });
  it('Should correctly get image URL if message is an image', async () => {
    wrap();

    const image = class {
      constructor() {
        setTimeout(() => {
          this.onload(); // simulate success
        }, 5);
      }
      onload() {}
    };
    window = Object.assign(window, { Image: image });
    const imageURL = component.imageURL;
    jest.advanceTimersByTime(10);
    expect(imageURL).toBe('http://localhost:4000/api/user/message/file/' + component.message.id + '/' + component.message.content);
    expect(component.state).toBe('loading');
  });
  it("Should set state to error if image isn't found", async () => {
    wrap();

    const image = class {
      constructor() {
        setTimeout(() => {
          this.onerror(); // simulate success
        }, 5);
      }
      onerror() {}
    };
    window = Object.assign(window, { Image: image });

    const imageURL = component.imageURL;
    jest.advanceTimersByTime(10);
    expect(imageURL).toBe('http://localhost:4000/api/user/message/file/' + component.message.id + '/' + component.message.content);
    expect(component.state).toBe('error');
  });
  it('Should correctly get sender pictuer', async () => {
    wrap();

    const senderPictureFixture = `http://localhost:4000/api/user/avatar/${component.message.sender.id}/${component.message.sender.picture}`;
    const senderPicture = component.senderPicture;
    expect(senderPicture).toEqual(senderPictureFixture);
  });
});

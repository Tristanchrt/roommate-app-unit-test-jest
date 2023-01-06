import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { franck } from '../../../fixtures/account/Account.fixture';
import { resolveModalController } from '../../../fixtures/ModalController.fixture';
import { stubRouter } from '../../../Utils';

import { UserCardComponent, UserCardVue } from '@/primary/components/match/userCard';
import { UserModalVue } from '@/primary/components/match/userModal';
import ModalController from '@/primary/utils/ModalController';

let wrapper: Wrapper<UserCardComponent>;
let component: UserCardComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = (overrideModalController?: ModalController) => {
  const modalController = overrideModalController ? overrideModalController : resolveModalController();
  wrapper = shallowMount<UserCardComponent>(UserCardVue, {
    provide: {
      modalController: () => modalController,
    },
    propsData: {
      user: franck,
    },
  });
  component = wrapper.vm;
};

describe('UserCard component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should open modal with good props', () => {
    const modalController = resolveModalController();
    const openModal = jest.spyOn(modalController, 'open');
    wrap(modalController);
    component.openModal();

    expect(openModal).toBeCalledWith({ component: UserModalVue, props: { user: component.user } });
  });
});

import sinon from 'sinon';

import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import VueRouter, { Route } from 'vue-router';

import { rejectAccountRepository, resolveAccountRepository } from '../fixtures/account/AccountRepository.fixture';
import { stubSocketRepository } from '../fixtures/chat/RestSocketRepository.fixture';
import { resolveModalController } from '../fixtures/ModalController.fixture';
import { resolveStoreRepository, stubStoreRepository } from '../fixtures/store/StoreRepository.fixture';
import { customError, flushPromises, stubRouter } from '../Utils';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { AppComponent, AppVue } from '@/primary/app';
import ModalController from '@/primary/utils/ModalController';

let wrapper: Wrapper<AppComponent>;
let component: AppComponent;

const $router: VueRouter = stubRouter();
const spyDestroy = sinon.stub();
const $routeWithQuery: Partial<Route> = {
  query: {
    redirect: 'delivery',
  },
};

const wrap = (
  overrideStoreRepository?: StoreRepository,
  overrideAccountRepository?: AccountRepository,
  overrideSocketRepository?: SocketRepository,
  overrideModalController?: ModalController
) => {
  const accountRepository = overrideAccountRepository ? overrideAccountRepository : resolveAccountRepository();
  const storeRepository = overrideStoreRepository ? overrideStoreRepository : resolveStoreRepository();
  const socketRepository = overrideSocketRepository ? overrideSocketRepository : stubSocketRepository();
  const modalController = overrideModalController ? overrideModalController : resolveModalController();

  wrapper = shallowMount<AppComponent>(AppVue, {
    mocks: {
      $router,
      $route: $routeWithQuery,
    },
    stubs: ['router-link', 'router-view'],
    provide: {
      storeRepository: () => storeRepository,
      accountRepository: () => accountRepository,
      socketRepository: () => socketRepository,
      modalController: () => modalController,
    },
    destroyed() {
      spyDestroy();
    },
  });
  component = wrapper.vm;
};

describe('App', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Should successfully retrieve user profile if he's connected", async () => {
    const storeRepository = resolveStoreRepository();
    const accountRepository = resolveAccountRepository();
    const getMe = jest.spyOn(accountRepository, 'getMe');
    wrap(storeRepository, accountRepository);

    const initSocketRepository = jest.spyOn(component, 'initSocketRepository');

    expect(getMe).toBeCalled();
    expect(component.loading).toBeTruthy();
    await flushPromises();

    expect(component.loading).toBeFalsy();
    expect(initSocketRepository).toBeCalled();
  });
  it('Should fail to retrieve user profile if some error occurs', async () => {
    const storeRepository = resolveStoreRepository();
    const accountRepository = rejectAccountRepository(customError(400, 'wrong token'));
    const getMe = jest.spyOn(accountRepository, 'getMe');
    const resetUser = jest.spyOn(storeRepository.user(), 'resetState');
    const push = jest.spyOn($router, 'push');
    wrap(storeRepository, accountRepository);

    expect(getMe).toBeCalled();
    expect(component.loading).toBeTruthy();
    await flushPromises();

    expect(component.loading).toBeFalsy();
    expect(push).toBeCalledWith({ name: 'SignIn' });
    expect(resetUser).toBeCalled();
  });
  it('Should not try to retrieve user informations if no user connected', () => {
    const storeRepository = stubStoreRepository();
    storeRepository.user().getToken.returns(null);
    const accountRepository = resolveAccountRepository();
    const getMe = jest.spyOn(accountRepository, 'getMe');
    wrap(storeRepository, accountRepository);

    expect(getMe).not.toBeCalled();
  });
  it('Should correctly init socketRepository', async () => {
    const storeRepository = stubStoreRepository();
    storeRepository.user().getToken.returns('someToken');
    const accountRepository = resolveAccountRepository();
    const socketRepository = stubSocketRepository();
    const initSocket = jest.spyOn(socketRepository, 'init');
    const destroySocket = jest.spyOn(socketRepository, 'destroy');
    wrap(storeRepository, accountRepository, socketRepository);

    const initSocketRepository = jest.spyOn(component, 'initSocketRepository');
    expect(component.userToken).toBeUndefined();

    await flushPromises();
    expect(initSocketRepository).toBeCalled();

    jest.advanceTimersByTime(1200);

    expect(initSocket).toHaveBeenCalled();

    storeRepository.user().getToken.returns(null);
    jest.advanceTimersByTime(1200);

    expect(component.userToken).not.toBeUndefined();

    expect(destroySocket).toBeCalled();
  });
  it('Should stop listening to to changes on destroy', async () => {
    wrap();

    component.listeningToUserToken = 123456789;
    component.$destroy();

    expect(component.listeningToUserToken).toBeUndefined();
  });
  it('Should open & close modal correctly', () => {
    const storeRepository = resolveStoreRepository();
    const accountRepository = resolveAccountRepository();
    const socketRepository = stubSocketRepository();
    const popUpComponent: VueConstructor = Vue.component('someCOmponent');
    const modalController = new ModalController();

    wrap(storeRepository, accountRepository, socketRepository, modalController);

    modalController.open({ component: popUpComponent });
    expect(component.modal).toStrictEqual({ component: popUpComponent, props: undefined });

    modalController.close();
    expect(component.modal).toBeNull();
  });
});

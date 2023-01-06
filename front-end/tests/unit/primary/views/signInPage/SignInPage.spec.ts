import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { rejectAccountRepository, resolveAccountRepository } from '../../../../unit/fixtures/account/AccountRepository.fixture';
import { customError, flushPromises, stubRouter } from '../../../../unit/Utils';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { SignInPageVue, SignInPageComponent } from '@/primary/views/signInPage';

let wrapper: Wrapper<SignInPageComponent>;
let component: SignInPageComponent;

let $router: VueRouter = stubRouter();

const wrap = (overrideAccountRepository?: AccountRepository) => {
  const accountRepository = overrideAccountRepository ? overrideAccountRepository : resolveAccountRepository;
  wrapper = shallowMount<SignInPageComponent>(SignInPageVue, {
    mocks: {
      $router: $router,
    },
    provide: {
      accountRepository: () => accountRepository,
    },
  });
  component = wrapper.vm;
};

describe('SignIn page', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should work to sign in if form is correctly filled', async () => {
    const accountRepository = resolveAccountRepository();
    const signInFunction = jest.spyOn(accountRepository, 'signIn');
    const routerPush = jest.spyOn($router, 'push');
    wrap(accountRepository);

    component.email = 'someEmail';
    component.password = 'somePassword';
    component.signIn();
    await flushPromises();

    expect(signInFunction).toBeCalledWith(component.email, component.password);
    expect(routerPush).toBeCalledWith({ name: 'Explore' });
  });
  it('Should fail to sign in if form is filled with wrong data', async () => {
    const accountRepository = rejectAccountRepository(customError(401, 'wrong credentials'));
    const signInFunction = jest.spyOn(accountRepository, 'signIn');
    const routerPush = jest.spyOn($router, 'push');
    wrap(accountRepository);

    component.email = 'someEmail';
    component.password = 'somePassword';
    component.signIn();
    expect(signInFunction).toBeCalledWith(component.email, component.password);

    await flushPromises();

    expect(component.password).toBe('');
    expect(routerPush).not.toBeCalled();
  });
  it("Should not try to sign in if form isn't filled", async () => {
    const accountRepository = resolveAccountRepository();
    const signInFunction = jest.spyOn(accountRepository, 'signIn');
    wrap(accountRepository);

    component.email = '';
    component.password = 'somePassword';
    component.signIn();
    expect(signInFunction).not.toBeCalled();

    component.email = 'someEmail';
    component.password = '';
    component.signIn();
    expect(signInFunction).not.toBeCalled();

    component.email = '';
    component.password = '';
    component.signIn();
    expect(signInFunction).not.toBeCalled();
  });
});

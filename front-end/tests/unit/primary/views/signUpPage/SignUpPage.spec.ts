import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { rejectAccountRepository, resolveAccountRepository } from '../../../../unit/fixtures/account/AccountRepository.fixture';
import { customError, flushPromises, stubRouter } from '../../../../unit/Utils';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { SignUpPageComponent, SignUpPageVue } from '@/primary/views/signUpPage';

let wrapper: Wrapper<SignUpPageComponent>;
let component: SignUpPageComponent;

let $router: VueRouter = stubRouter();

const wrap = (overrideAccountRepository?: AccountRepository) => {
  const accountRepository = overrideAccountRepository ? overrideAccountRepository : resolveAccountRepository;
  wrapper = shallowMount<SignUpPageComponent>(SignUpPageVue, {
    mocks: {
      $router: $router,
    },
    provide: {
      accountRepository: () => accountRepository,
    },
  });
  component = wrapper.vm;
};

interface IComputed {
  canSignUp: boolean;
  doPasswordsMatch: boolean;
}
const wrapWithComputed = (overrideAccountRepository?: AccountRepository, computed?: IComputed) => {
  const accountRepository = overrideAccountRepository ? overrideAccountRepository : resolveAccountRepository;
  const computedFinal: IComputed = computed ? computed : { canSignUp: false, doPasswordsMatch: false };
  wrapper = shallowMount<SignUpPageComponent>(SignUpPageVue, {
    mocks: {
      $router: $router,
    },
    provide: {
      accountRepository: () => accountRepository,
    },
    computed: {
      canSignUp() {
        return computedFinal.canSignUp;
      },
      doPasswordsMatch() {
        return computedFinal.doPasswordsMatch;
      },
    },
  });
  component = wrapper.vm;
};

describe('SignUp page', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Should not sign up if required fields aren't fill", async () => {
    const accountRepository = resolveAccountRepository();
    const signUpAccountRepository = jest.spyOn(accountRepository, 'signUp');

    wrapWithComputed(accountRepository, { canSignUp: false, doPasswordsMatch: false });
    component.isApiCalled = false;

    component.signUp();

    await flushPromises();

    expect(component.isApiCalled).toBeFalsy();
    expect(signUpAccountRepository).not.toBeCalled();
  });
  it('Should fail to sign up if error occurs in the server', async () => {
    const accountRepository = rejectAccountRepository(customError(500, 'Network Error'));
    const signUpAccountRepository = jest.spyOn(accountRepository, 'signUp');
    const routerPush = jest.spyOn($router, 'push');

    wrapWithComputed(accountRepository, { canSignUp: true, doPasswordsMatch: true });
    component.isApiCalled = false;

    component.signUp();
    expect(component.isApiCalled).toBeTruthy();
    await flushPromises();
    expect(signUpAccountRepository).toBeCalled();
    expect(routerPush).not.toBeCalled();
    expect(component.isApiCalled).toBeFalsy();
  });
  it('Should successfully sign up', async () => {
    const accountRepository = resolveAccountRepository();
    const signUpAccountRepository = jest.spyOn(accountRepository, 'signUp');
    const routerPush = jest.spyOn($router, 'push');

    wrapWithComputed(accountRepository, { canSignUp: true, doPasswordsMatch: true });
    component.isApiCalled = false;
    component.birthdate = new Date();
    component.email = 'someEmail';
    component.firstName = 'someFirstName';
    component.lastName = 'someLastName';
    component.password = 'somePassword';

    component.signUp();
    expect(component.isApiCalled).toBeTruthy();
    await flushPromises();
    expect(signUpAccountRepository).toBeCalledWith('someFirstName', 'someLastName', component.birthdate, 'someEmail', 'somePassword');
    expect(routerPush).toBeCalledWith({ name: 'Filters' });
    expect(component.isApiCalled).toBeFalsy();
  });
  it("Should return false if passwords don't match", async () => {
    wrap();
    component.password = 'somePassword';
    component.confirmPassword = 'someConfirmPassword';
    expect(component.doPasswordsMatch).toBeFalsy();

    component.password = '';
    component.confirmPassword = '';
    expect(component.doPasswordsMatch).toBeFalsy();
  });
  it('Should return true if passwords match', async () => {
    wrap();
    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    expect(component.doPasswordsMatch).toBeTruthy();
  });
  it("Should return false if user can't signUp", async () => {
    wrap();

    component.password = '';
    component.confirmPassword = 'somePassword';
    component.email = 'someEmail';
    component.firstName = 'someFirstName';
    component.lastName = 'somelastName';
    component.isApiCalled = false;
    component.birthdate = new Date();
    expect(component.canSignUp).toBeFalsy();

    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    component.email = '';
    component.firstName = 'someFirstName';
    component.lastName = 'somelastName';
    component.isApiCalled = false;
    component.birthdate = new Date();
    expect(component.canSignUp).toBeFalsy();

    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    component.email = 'someEmail';
    component.firstName = '';
    component.lastName = 'somelastName';
    component.isApiCalled = false;
    component.birthdate = new Date();
    expect(component.canSignUp).toBeFalsy();

    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    component.email = 'someEmail';
    component.firstName = 'someFirstName';
    component.lastName = '';
    component.isApiCalled = false;
    component.birthdate = new Date();
    expect(component.canSignUp).toBeFalsy();

    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    component.email = 'someEmail';
    component.firstName = 'someFirstName';
    component.lastName = 'somelastName';
    component.isApiCalled = true;
    component.birthdate = new Date();
    expect(component.canSignUp).toBeFalsy();

    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    component.email = 'someEmail';
    component.firstName = 'someFirstName';
    component.lastName = 'somelastName';
    component.isApiCalled = false;
    component.birthdate = null;
    expect(component.canSignUp).toBeFalsy();
  });
  it('Should return true if user can signUp', async () => {
    wrap();

    component.password = 'somePassword';
    component.confirmPassword = 'somePassword';
    component.email = 'someEmail';
    component.firstName = 'someFirstName';
    component.lastName = 'somelastName';
    component.isApiCalled = false;
    component.birthdate = new Date();
    expect(component.canSignUp).toBeTruthy();
  });
});

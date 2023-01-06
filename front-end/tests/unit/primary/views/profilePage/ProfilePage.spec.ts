import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { franck, tristan } from '../../../fixtures/account/Account.fixture';
import {
  rejectAccountRepository,
  resolveAccountRepository,
  stubAccountRepository,
} from '../../../fixtures/account/AccountRepository.fixture';
import { resolveRoutesController, stubRoutesController } from '../../../fixtures/RoutesController.fixture';
import { resolveStoreRepository, stubStoreRepository } from '../../../fixtures/store/StoreRepository.fixture';
import { customError, flushPromises, stubRouter } from '../../../Utils';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { User } from '@/domain/account/User';
import { StoreRepository } from '@/domain/store/StoreRepository';
import RoutesController from '@/primary/utils/RoutesController';
import { ProfilePageComponent, ProfilePageVue } from '@/primary/views/profilePage';

let wrapper: Wrapper<ProfilePageComponent>;
let component: ProfilePageComponent;

let $router: VueRouter = stubRouter();

interface WrapParams {
  overrideStoreRepository?: StoreRepository;
  overrideRoutesController?: RoutesController;
  overrideAccountRepository?: AccountRepository;
  router?: VueRouter;
}
const wrap = (params?: WrapParams) => {
  const storeRepository = params?.overrideStoreRepository ? params!.overrideStoreRepository : resolveStoreRepository();
  const routesController = params?.overrideRoutesController ? params!.overrideRoutesController : resolveRoutesController();
  const accountRepository = params?.overrideAccountRepository ? params!.overrideAccountRepository : resolveAccountRepository();

  wrapper = shallowMount<ProfilePageComponent>(ProfilePageVue, {
    mocks: {
      $router: params?.router ? params!.router : $router,
    },
    provide: {
      storeRepository: () => storeRepository,
      accountRepository: () => accountRepository,
      routesController: () => routesController,
    },
  });
  component = wrapper.vm;
};

describe('Profile page', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should redirect to sign in page on load if no user connected', () => {
    const routesController = stubRoutesController();
    const storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(null);
    wrap({ overrideStoreRepository: storeRepository, overrideRoutesController: routesController });

    expect(routesController.isUserAuthenticated.calledOnce).toBeTruthy();
    expect(component.user).toBe(null);
    expect($router.push).toBeCalledWith({ name: 'SignIn' });
  });
  it('Should correctly init component from user infos', () => {
    const storeRepository = stubStoreRepository();
    const trist: User = { ...tristan, description: 'someDescription', picture: '' };
    storeRepository.user().getUser.returns(trist);
    wrap({ overrideStoreRepository: storeRepository });
    expect(component.user).toStrictEqual(trist);
    expect(component.description).toBe(trist.description);
    expect(component.profilePicture).toBe(null);

    wrap();
    expect(component.user).toStrictEqual(franck);
    expect(component.description).toBe('');
    expect(component.profilePicture).toBe(`http://localhost:4000/api/user/avatar/${franck.id}/${franck.picture}`);
  });
  it('Should set textArea automatically on input', async () => {
    wrap();

    component.description = 'some input with\ntext space\n.';
    component.setTextAreaHeight();
    const textArea: any = component.$el.querySelector('#input');

    await component.$nextTick();
    expect(textArea.style.height).toBe(`${textArea.scrollHeight}px`);
  });
  it('Should correctly redirect to Filters Page', async () => {
    wrap();
    component.modifyFilters();
    expect($router.push).toBeCalledWith({ name: 'Filters' });
  });
  it('Should correctly trigger input file', async () => {
    wrap();
    await component.$nextTick();

    const fileSelector: HTMLFormElement = component.$refs.file as HTMLFormElement;
    const fileSelectorClick = jest.spyOn(fileSelector, 'click');
    component.triggerInputFile();

    expect(fileSelectorClick).toBeCalledTimes(1);
  });
  it('Should correctly change user profile picture', async () => {
    const tristanModified = { ...tristan, picture: 'someRandomPictureForTestingPurpose' };
    const accountRepository = stubAccountRepository();
    accountRepository.updateProfilePicture.resolves(tristanModified);
    wrap({ overrideAccountRepository: accountRepository });
    component.changePicture();
    await flushPromises();
    expect(component.user).toEqual(tristanModified);
    expect((component.$refs.file as HTMLFormElement).value).toBe('');
  });
  it('Should fail to change user profile picture', async () => {
    const accountRepository = rejectAccountRepository(customError(500, 'Network Error: Some network error.'));
    wrap({ overrideAccountRepository: accountRepository });
    component.user = franck;
    component.changePicture();
    await flushPromises();
    expect(component.user).toEqual(franck);
    expect((component.$refs.file as HTMLFormElement).value).toBe('');
  });
});

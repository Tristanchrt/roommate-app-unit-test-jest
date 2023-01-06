import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { resolveRoutesController, stubRoutesController } from '../../../fixtures/RoutesController.fixture';
import { resolveStoreRepository, stubStoreRepository } from '../../../fixtures/store/StoreRepository.fixture';
import { stubRouter } from '../../../Utils';

import { StoreRepository } from '@/domain/store/StoreRepository';
import RoutesController from '@/primary/utils/RoutesController';
import { MatchPageComponent, MatchPageVue } from '@/primary/views/matchPage';

let wrapper: Wrapper<MatchPageComponent>;
let component: MatchPageComponent;

const $router: VueRouter = stubRouter();

interface WrapParams {
  overrideStoreRepository?: StoreRepository;
  overrideRoutesController?: RoutesController;
}
const wrap = (params?: WrapParams) => {
  const storeRepository = params?.overrideStoreRepository ? params?.overrideStoreRepository : resolveStoreRepository();
  const routesController = params?.overrideRoutesController ? params?.overrideRoutesController : resolveRoutesController();
  wrapper = shallowMount<MatchPageComponent>(MatchPageVue, {
    mocks: {
      $router: $router,
    },
    provide: {
      storeRepository: () => storeRepository,
      routesController: () => routesController,
    },
  });
  component = wrapper.vm;
};

describe('Profile page', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should redirect if user is not connected', () => {
    const routesController = stubRoutesController();
    routesController.isUserAuthenticated.returns(false);
    const storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(null);
    const routerPush = jest.spyOn($router, 'push');
    const getUser = jest.spyOn(storeRepository.user(), 'getUser');
    wrap({ overrideStoreRepository: storeRepository, overrideRoutesController: routesController });

    expect(routesController.isUserAuthenticated.called).toBeTruthy();
    expect(routerPush).toBeCalledWith({ name: 'SignIn' });
    expect(getUser).not.toBeCalled();
  });
  it('Should correctly init component', () => {
    const storeRepository = resolveStoreRepository();
    const getUser = jest.spyOn(storeRepository.user(), 'getUser');

    wrap({ overrideStoreRepository: storeRepository });

    expect(getUser).toBeCalled();
  });
});

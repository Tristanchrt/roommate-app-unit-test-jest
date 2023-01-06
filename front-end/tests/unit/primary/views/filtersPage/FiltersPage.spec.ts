import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { franck } from '../../../fixtures/account/Account.fixture';
import { resolveRoutesController, stubRoutesController } from '../../../fixtures/RoutesController.fixture';
import { stubStoreRepository } from '../../../fixtures/store/StoreRepository.fixture';
import { stubRouter } from '../../../Utils';

import { StoreRepository } from '@/domain/store/StoreRepository';
import RoutesController from '@/primary/utils/RoutesController';
import { FiltersPageVue } from '@/primary/views/filtersPage';
import FiltersPageComponent from '@/primary/views/filtersPage/FiltersPage.component';

let wrapper: Wrapper<FiltersPageComponent>;
let component: FiltersPageComponent;

let $router: VueRouter = stubRouter();
interface WrapParams {
  storeRepository?: StoreRepository;
  routesController?: RoutesController;
}

const wrap = (params?: WrapParams) => {
  const routesController = params?.routesController ? params!.routesController : resolveRoutesController();
  const storeRepository = params?.storeRepository ? params!.storeRepository : stubStoreRepository();
  wrapper = shallowMount<FiltersPageComponent>(FiltersPageVue, {
    mocks: {
      $router,
    },
    provide: {
      routesController: () => routesController,
      storeRepository: () => storeRepository,
    },
  });
  component = wrapper.vm;
};

describe('Filters page', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Should redirect to sign up if user isn't connected", () => {
    const routesController = stubRoutesController();
    const storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(null);
    routesController.isUserAuthenticated.returns(false);
    wrap({ routesController, storeRepository });

    expect(routesController.isUserAuthenticated.called).toBeTruthy();
    expect($router.push).toBeCalledWith({ name: 'SignIn' });
  });
  it('Should correctly init the component', () => {
    const routesController = resolveRoutesController();
    const storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(franck);
    wrap({ routesController, storeRepository });

    component.$nextTick();

    expect(routesController.isUserAuthenticated.called).toBeTruthy();
    expect(component.user).toEqual(franck);
    expect(component.categories[0].selected).toBeTruthy();
  });
  it('Should select categories', () => {
    const storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(null);
    wrap({ storeRepository });

    component.selectCategorie(0);
    expect(component.selectedCategorie).toEqual(component.categories[0]);
    const categories = component.categories.filter(categorie => categorie.selected == true);
    expect(categories.length).toBe(1);
    expect(categories[0]).toEqual(component.selectedCategorie);
  });
});

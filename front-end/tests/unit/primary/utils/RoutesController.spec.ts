import Vue, { VueConstructor } from 'vue';

import { resolveStoreRepository, stubStoreRepository } from '../../fixtures/store/StoreRepository.fixture';

import RoutesController from '@/primary/utils/RoutesController';

describe('Routes Controller', () => {
  it('Should correctly check if user is authenticated', () => {
    let storeRepository = resolveStoreRepository();
    let routesController = new RoutesController(storeRepository);

    const getUser = jest.spyOn(storeRepository.user(), 'getUser');
    expect(routesController.isUserAuthenticated()).toBeTruthy();
    expect(getUser).toBeCalled();

    storeRepository = stubStoreRepository();
    storeRepository.user().getUser.returns(null);
    routesController = new RoutesController(storeRepository);

    expect(routesController.isUserAuthenticated()).toBeFalsy();
  });
});

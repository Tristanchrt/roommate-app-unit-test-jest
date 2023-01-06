import sinon, { SinonStub } from 'sinon';

import RoutesController from '@/primary/utils/RoutesController';

interface RoutesControllerStub extends RoutesController {
  isUserAuthenticated: SinonStub;
}
export const stubRoutesController = (): RoutesControllerStub =>
  ({
    isUserAuthenticated: sinon.stub(),
  } as RoutesControllerStub);

export const resolveRoutesController = (): RoutesControllerStub => {
  const routesController = stubRoutesController();
  routesController.isUserAuthenticated.returns(true);
  return routesController;
};

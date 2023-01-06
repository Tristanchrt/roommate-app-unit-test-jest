import sinon, { SinonStub } from 'sinon';

import { franck } from '../account/Account.fixture';

import { UserStoreDomain } from '@/domain/store/StoreRepository';

export interface UserStoreModuleStub extends UserStoreDomain {
  resetState: SinonStub;
  getUser: SinonStub;
  setUser: SinonStub;
  getToken: SinonStub;
  setToken: SinonStub;
  setFilters: SinonStub;
}
export const stubUserStoreModule = (): UserStoreModuleStub => ({
  resetState: sinon.stub(),
  getUser: sinon.stub(),
  setUser: sinon.stub(),
  getToken: sinon.stub(),
  setToken: sinon.stub(),
  setFilters: sinon.stub(),
});

export const resolveUserStoreModule = (): UserStoreModuleStub => {
  const userStoreModule = stubUserStoreModule();
  userStoreModule.getUser.returns(franck);
  userStoreModule.setUser.returns(franck);
  userStoreModule.getToken.returns('someToken');
  userStoreModule.setToken.returns('someToken');
  userStoreModule.setFilters.returns(franck.filters);
  return userStoreModule;
};

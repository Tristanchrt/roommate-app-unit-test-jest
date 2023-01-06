import sinon, { SinonStub } from 'sinon';

import { franck } from '../account/Account.fixture';

import { SocketStoreDomain, UserStoreDomain } from '@/domain/store/StoreRepository';

export interface SocketStoreModuleStub extends SocketStoreDomain {
  resetState: SinonStub;
  getLastestMessage: SinonStub;
  setLastestMessage: SinonStub;
}
export const stubSocketStoreModule = (): SocketStoreModuleStub => ({
  resetState: sinon.stub(),
  getLastestMessage: sinon.stub(),
  setLastestMessage: sinon.stub(),
});

export const resolveSocketStoreModule = (): SocketStoreModuleStub => {
  const userStoreModule = stubSocketStoreModule();
  userStoreModule.getLastestMessage.returns(franck);
  userStoreModule.setLastestMessage.returns(franck);
  return userStoreModule;
};

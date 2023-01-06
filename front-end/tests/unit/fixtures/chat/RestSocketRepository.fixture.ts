import sinon, { SinonStub } from 'sinon';

import { SocketRepository } from '@/domain/socket/SocketRepository';

interface RestSocketRepositoryStub extends SocketRepository {
  init: SinonStub;
  destroy: SinonStub;
  listenToMessage: SinonStub;
  sendMessage: SinonStub;
  uploadFile: SinonStub;
}
export const stubSocketRepository = (): RestSocketRepositoryStub => ({
  init: sinon.stub(),
  destroy: sinon.stub(),
  listenToMessage: sinon.stub(),
  sendMessage: sinon.stub(),
  uploadFile: sinon.stub(),
});

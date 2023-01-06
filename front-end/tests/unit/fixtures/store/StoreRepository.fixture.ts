import { SocketStoreModuleStub, stubSocketStoreModule } from './SocketStoreModule.fixture';
import { resolveUserStoreModule, stubUserStoreModule, UserStoreModuleStub } from './UserStoreModule.fixture';

import { StoreRepository } from '@/domain/store/StoreRepository';

export class StubStoreRepository implements StoreRepository {
  constructor(private userStore: UserStoreModuleStub, private socketStore: SocketStoreModuleStub) {}

  user() {
    return this.userStore;
  }

  socket() {
    return this.socketStore;
  }
}

export const stubStoreRepository = (): StubStoreRepository => {
  const storeRepository = new StubStoreRepository(stubUserStoreModule(), stubSocketStoreModule());
  return storeRepository;
};

export const resolveStoreRepository = (): StubStoreRepository => {
  const storeRepository = new StubStoreRepository(resolveUserStoreModule(), stubSocketStoreModule());
  return storeRepository;
};

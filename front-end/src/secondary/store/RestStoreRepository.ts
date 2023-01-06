import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { SocketStoreClass, socketStoreModule } from './SocketStore';
import { userStoreModule, UserStoreClass } from './UserStore';

import { SocketStoreDomain, StoreRepository, UserStoreDomain } from '@/domain/store/StoreRepository';

Vue.use(Vuex);

export const store = new Store({
  modules: {
    user: userStoreModule,
    socket: socketStoreModule,
  },
});

export default class RestStoreRepository implements StoreRepository {
  private store: Store<any> = store;
  private userStoreClass: UserStoreDomain = new UserStoreClass();
  private socketStoreClass: SocketStoreDomain = new SocketStoreClass();

  public socket(): SocketStoreDomain {
    return this.socketStoreClass;
  }

  public user(): UserStoreDomain {
    return this.userStoreClass;
  }
}

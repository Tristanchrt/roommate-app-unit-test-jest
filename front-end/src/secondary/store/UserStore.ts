import { Module } from 'vuex';

import { LocalStorage } from './LocalStorage';

import Filter from '@/domain/account/filter/Filter';
import { User } from '@/domain/account/User';
import { UserStoreDomain } from '@/domain/store/StoreRepository';

const defaultState = () => ({
  token: LocalStorage.getUserToken(),
  user: null,
});

const userStoreModule: Module<any, any> = {
  namespaced: true,
  state: defaultState(),
};

class UserStoreClass implements UserStoreDomain {
  private module: Module<any, any> = userStoreModule;
  private state = this.module.state;

  public resetState() {
    LocalStorage.removeUserToken();
    this.state = defaultState();
  }

  public getUser(): User {
    return this.state.user;
  }
  public setUser(value: User): User {
    this.state.user = value;
    return this.state.user;
  }
  public getToken(): string {
    return this.state.token;
  }
  public setToken(value: string): string {
    LocalStorage.setUserToken(value);
    this.state.token = value;
    return this.state.token;
  }
  public setFilters(value: Array<Filter>): Array<Filter> {
    if (this.state.user == null) throw new Error("You're trying to set filters of null");
    this.state.user.filters = value;
    return this.state.user.filters;
  }
}

export { userStoreModule, UserStoreClass };

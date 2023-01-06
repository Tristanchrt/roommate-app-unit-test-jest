import { franck } from '../fixtures/account/Account.fixture';
import { filter, customProfileFilter } from '../fixtures/account/filter/Filter.fixture';
import { messageFranckTristan } from '../fixtures/chat/Message.fixture';

import Filter from '@/domain/account/filter/Filter';
import { User } from '@/domain/account/User';
import { Message } from '@/domain/chat/Message';
import { LocalStorage } from '@/secondary/store/LocalStorage';
import StoreRepository, { store } from '@/secondary/store/RestStoreRepository';

let storeRepository = new StoreRepository();
describe('StoreRepository', () => {
  beforeEach(() => {
    localStorage.clear();
    storeRepository.user().resetState();
    storeRepository.socket().resetState();
  });
  it('Should correctly set & get a new socket/message', () => {
    const message: Message = storeRepository.socket().setLastestMessage(messageFranckTristan);

    expect(storeRepository.socket().getLastestMessage()).toEqual(messageFranckTristan);
    expect(message).toEqual(messageFranckTristan);
  });
  it('Should correctly set & get user/token', () => {
    const setUserTokenToLocalStorage = jest.spyOn(LocalStorage, 'setUserToken');
    const token: string = storeRepository.user().setToken('someToken');

    expect(setUserTokenToLocalStorage).toBeCalledWith('someToken');
    expect(storeRepository.user().getToken()).toBe('someToken');
    expect(token).toBe('someToken');
  });
  it('Should correctly set & get a user', () => {
    const user: User = storeRepository.user().setUser(franck);

    expect(storeRepository.user().getUser()).toEqual(franck);
    expect(user).toEqual(franck);
  });
  it('Should fail to set user filters if user is null', () => {
    try {
      storeRepository.user().setFilters([]);
    } catch (error) {
      expect(error).toEqual(Error("You're trying to set filters of null"));
    }
  });
  it('Should correctly set user filters', () => {
    storeRepository.user().setUser(franck);
    const filters = [filter, customProfileFilter];
    const result: Array<Filter> = storeRepository.user().setFilters(filters);

    expect(storeRepository.user().getUser().filters).toEqual(filters);
    expect(result).toStrictEqual(filters);
  });
});

import Filter from '../account/filter/Filter';
import { User } from '../account/User';
import { Message } from '../chat/Message';

export interface UserStoreDomain {
  resetState(): void;
  getUser(): User;
  setUser(value: User): User;
  getToken(): string;
  setToken(value: string): string;
  setFilters(value: Array<Filter>): Array<Filter>;
}

export interface SocketStoreDomain {
  resetState(): void;
  getLastestMessage(): Message;
  setLastestMessage(message: Message): Message;
}

export interface StoreRepository {
  user(): UserStoreDomain;
  socket(): SocketStoreDomain;
}

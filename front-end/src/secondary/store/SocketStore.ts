import { Module } from 'vuex';

import { Message } from '@/domain/chat/Message';
import { SocketStoreDomain } from '@/domain/store/StoreRepository';

const defaultState = () => ({
  lastestMessage: null,
  previousMessage: null,
});

const socketStoreModule: Module<any, any> = {
  namespaced: true,
  state: defaultState(),
};

class SocketStoreClass implements SocketStoreDomain {
  private module: Module<any, any> = socketStoreModule;
  private state = this.module.state;

  public resetState() {
    this.state = defaultState();
  }

  getLastestMessage(): Message {
    return this.state.lastestMessage;
  }
  setLastestMessage(message: Message): Message {
    this.state.lastestMessage = message;
    return this.state.lastestMessage;
  }
}

export { socketStoreModule, SocketStoreClass };

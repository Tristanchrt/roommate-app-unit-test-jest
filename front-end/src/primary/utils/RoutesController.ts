import VueRouter from 'vue-router';

import { StoreRepository } from '@/domain/store/StoreRepository';

export default class RoutesController {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  isUserAuthenticated(): boolean {
    const user = this.storeRepository.user().getUser();
    if (user == null) {
      return false;
    }
    return true;
  }
}

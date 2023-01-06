import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { franck } from '../../../../../fixtures/account/Account.fixture';
import { resolveAccountRepository, stubAccountRepository } from '../../../../../fixtures/account/AccountRepository.fixture';
import { filter, newFilter } from '../../../../../fixtures/account/filter/Filter.fixture';
import { resolveStoreRepository } from '../../../../../fixtures/store/StoreRepository.fixture';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { HobbiesCategoryVue } from '@/primary/components/filters/categories/hobbies';
import HobbiesCategoryComponent from '@/primary/components/filters/categories/hobbies/Hobbies.component';

let wrapper: Wrapper<HobbiesCategoryComponent>;
let component: HobbiesCategoryComponent;

interface WrapParams {
  storeRepository?: StoreRepository;
  accountRepository?: AccountRepository;
}

const wrap = (params?: WrapParams) => {
  const storeRepository = params?.storeRepository ? params!.storeRepository : resolveStoreRepository();
  const accountRepository = params?.accountRepository ? params!.accountRepository : resolveAccountRepository();

  wrapper = shallowMount<HobbiesCategoryComponent>(HobbiesCategoryVue, {
    provide: {
      storeRepository: () => storeRepository,
      accountRepository: () => accountRepository,
    },
  });
  component = wrapper.vm;
};

describe('Hobbies Component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should updated filter', () => {
    const storeRepository = resolveStoreRepository();
    const accountRepository = resolveAccountRepository();
    const updateFilter = jest.spyOn(accountRepository, 'updateFilter');
    wrap({ storeRepository, accountRepository });

    component.updateFilter(newFilter.name, newFilter.type, newFilter.value);

    expect(updateFilter).toHaveBeenCalledWith({ name: newFilter.name, type: newFilter.type, value: newFilter.value });
  });
  it('Should not find filter', () => {
    const storeRepository = resolveStoreRepository();
    const accountRepository = stubAccountRepository();
    storeRepository.user().getUser.returns(franck);

    wrap({ storeRepository, accountRepository });
    const filter = component.findFilter('someUnknownFilter');
    expect(filter).toEqual(undefined);
  });
  it('Should find filter', () => {
    const storeRepository = resolveStoreRepository();
    const accountRepository = stubAccountRepository();
    franck.filters = [...franck.filters, filter];
    storeRepository.user().getUser.returns(franck);

    wrap({ storeRepository, accountRepository });
    const _filter = component.findFilter(filter.name);
    expect(_filter).toEqual(filter.value);
  });
});

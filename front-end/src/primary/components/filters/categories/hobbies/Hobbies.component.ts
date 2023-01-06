import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AccountRepository } from '@/domain/account/AccountRepository';
import Filter, { NumberFilter, TypeFilter } from '@/domain/account/filter/Filter';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { ElementSelectorVue } from '@/primary/components/filters/elements/elementSelector';
import { ImageSelectorVue } from '@/primary/components/filters/elements/imageSelector';
import { NumberFilterVue } from '@/primary/components/filters/elements/number';
import { SelectFilterVue } from '@/primary/components/filters/elements/select';
import { SliderFilterVue } from '@/primary/components/filters/elements/slider';

@Component({ components: { NumberFilterVue, SliderFilterVue, SelectFilterVue, ElementSelectorVue, ImageSelectorVue } })
export default class HobbiesCategoryComponent extends Vue {
  @Inject()
  private accountRepository!: () => AccountRepository;

  @Inject()
  private storeRepository!: () => StoreRepository;

  updateFilter(filterName: string, filterType: TypeFilter, value: any) {
    this.accountRepository().updateFilter({
      name: filterName,
      type: filterType,
      value: value,
    });
  }

  findFilter(name: string): Filter | undefined {
    return this.storeRepository()
      .user()
      .getUser()
      .filters.find(filter => filter.name == name)?.value;
  }
}

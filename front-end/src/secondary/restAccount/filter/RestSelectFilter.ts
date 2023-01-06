import { RestFilter, RestTypeFilter } from './RestFilter';

import { SelectFilter, TypeFilter } from '@/domain/account/filter/Filter';

export default interface RestSelectFilter extends RestFilter {
  type: RestTypeFilter.SelectFilter;
  valFilter: Array<string>;
}

export const toSelectFilter = (restSliderFilter: RestSelectFilter): SelectFilter => ({
  id: restSliderFilter._id,
  name: restSliderFilter.name,
  type: TypeFilter.SelectFilter,
  value: restSliderFilter.valFilter,
});

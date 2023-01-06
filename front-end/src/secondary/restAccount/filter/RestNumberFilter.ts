import { RestFilter, RestTypeFilter } from './RestFilter';

import { NumberFilter, SliderFilter, TypeFilter } from '@/domain/account/filter/Filter';

export default interface RestNumberFilter extends RestFilter {
  type: RestTypeFilter.NumberFilter;
  valFilter: number;
}

export const toNumberFilter = (restSliderFilter: RestNumberFilter): NumberFilter => ({
  id: restSliderFilter._id,
  name: restSliderFilter.name,
  type: TypeFilter.NumberFilter,
  value: restSliderFilter.valFilter,
});

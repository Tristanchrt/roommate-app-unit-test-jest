import { RestFilter, RestTypeFilter } from './RestFilter';

import { SliderFilter, TypeFilter } from '@/domain/account/filter/Filter';

export default interface RestSliderFilter extends RestFilter {
  type: RestTypeFilter.SliderFilter;
  valFilter: Array<any>;
}

export const toSliderFilter = (restSliderFilter: RestSliderFilter): SliderFilter => ({
  id: restSliderFilter._id,
  name: restSliderFilter.name,
  type: TypeFilter.SliderFilter,
  value: restSliderFilter.valFilter,
});

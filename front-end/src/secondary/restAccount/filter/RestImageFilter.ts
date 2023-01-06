import { RestFilter, RestTypeFilter } from './RestFilter';

import { ImageFilter, TypeFilter } from '@/domain/account/filter/Filter';

export default interface RestImageFilter extends RestFilter {
  type: RestTypeFilter.ImageFilter;
  valFilter: Array<string>;
}

export const toImageFilter = (restImageFilter: RestImageFilter): ImageFilter => ({
  id: restImageFilter._id,
  name: restImageFilter.name,
  type: TypeFilter.ImageFilter,
  value: restImageFilter.valFilter,
});

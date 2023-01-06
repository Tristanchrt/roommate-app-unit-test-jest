import RestCustomProfileFilter, { toCustomProfileFilter } from './RestCustomProfileFilter';
import RestImageFilter, { toImageFilter } from './RestImageFilter';
import RestNumberFilter, { toNumberFilter } from './RestNumberFilter';
import RestSelectFilter, { toSelectFilter } from './RestSelectFilter';
import RestSliderFilter, { toSliderFilter } from './RestSliderFilter';

import Filter, { SelectFilter, TypeFilter } from '@/domain/account/filter/Filter';

export enum RestTypeFilter {
  CustomProfileFilter = 'CustomProfileFilter',
  SelectFilter = 'SelectFilter',
  SliderFilter = 'SliderFilter',
  NumberFilter = 'NumberFilter',
  ImageFilter = 'ImageFilter',
  Default = 'Default',
}

export interface RestFilter {
  _id: string;
  name: string;
  valFilter: any;
  type: RestTypeFilter;
  createdAt: Date;
}

export interface RestNewFilter {
  name: string;
  valFilter: any;
  type: RestTypeFilter;
}

export const toFilter = (restFilter: RestFilter): Filter => {
  if (restFilter.type == RestTypeFilter.CustomProfileFilter) return toCustomProfileFilter(restFilter as RestCustomProfileFilter);
  if (restFilter.type == RestTypeFilter.SelectFilter) return toSelectFilter(restFilter as RestSelectFilter);
  if (restFilter.type == RestTypeFilter.NumberFilter) return toNumberFilter(restFilter as RestNumberFilter);
  if (restFilter.type == RestTypeFilter.SliderFilter) return toSliderFilter(restFilter as RestSliderFilter);
  if (restFilter.type == RestTypeFilter.ImageFilter) return toImageFilter(restFilter as RestImageFilter);
  return {
    id: restFilter._id,
    type: TypeFilter.Default,
    name: restFilter.name,
    value: restFilter.valFilter,
  };
};

export const toRestNewFilter = (filter: Filter): RestNewFilter => {
  let restTypeFilter: RestTypeFilter = RestTypeFilter.Default;
  switch (filter.type) {
    case TypeFilter.CustomProfileFilter:
      restTypeFilter = RestTypeFilter.CustomProfileFilter;
      break;
    case TypeFilter.ImageFilter:
      restTypeFilter = RestTypeFilter.ImageFilter;
      break;
    case TypeFilter.NumberFilter:
      restTypeFilter = RestTypeFilter.NumberFilter;
      break;
    case TypeFilter.SelectFilter:
      restTypeFilter = RestTypeFilter.SelectFilter;
      break;
    case TypeFilter.SliderFilter:
      restTypeFilter = RestTypeFilter.SliderFilter;
      break;
  }

  return {
    type: restTypeFilter,
    name: filter.name,
    valFilter: filter.value,
  };
};

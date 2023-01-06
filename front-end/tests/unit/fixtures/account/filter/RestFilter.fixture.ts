import RestCustomProfileFilter from '@/secondary/restAccount/filter/RestCustomProfileFilter';
import { RestFilter, RestNewFilter, RestTypeFilter } from '@/secondary/restAccount/filter/RestFilter';
import RestImageFilter from '@/secondary/restAccount/filter/RestImageFilter';
import RestNumberFilter from '@/secondary/restAccount/filter/RestNumberFilter';
import RestSelectFilter from '@/secondary/restAccount/filter/RestSelectFilter';
import RestSliderFilter from '@/secondary/restAccount/filter/RestSliderFilter';

const restFilter: RestFilter = {
  _id: 'someFilterId',
  type: RestTypeFilter.Default,
  name: 'someFilterName',
  valFilter: 'someValue',
  createdAt: new Date(),
};

const restNewFilter: RestNewFilter = {
  type: RestTypeFilter.Default,
  name: 'someFilterName',
  valFilter: 'someValue',
};

const restCustomProfileFilter: RestCustomProfileFilter = {
  _id: 'someCustomProfileFilterId',
  type: RestTypeFilter.CustomProfileFilter,
  name: 'someCustomProfileFilterName',
  valFilter: [
    {
      icon: 'someIcon',
      text: 'someText',
    },
    {
      icon: 'someIcon2',
      text: 'someText2',
    },
  ],
  createdAt: new Date(),
};

const restSliderFilter: RestSliderFilter = {
  _id: 'someSliderFilterId',
  type: RestTypeFilter.SliderFilter,
  name: 'someSliderFilter',
  valFilter: [0, 100, 200],
  createdAt: new Date(),
};

const restImageFilter: RestImageFilter = {
  _id: 'someImageFilterId',
  type: RestTypeFilter.ImageFilter,
  name: 'someImageFilter',
  valFilter: ['france', 'spain'],
  createdAt: new Date(),
};

const restSelectFilter: RestSelectFilter = {
  _id: 'someSelectFilterId',
  type: RestTypeFilter.SelectFilter,
  name: 'someSelectFilter',
  valFilter: ['value_1', 'value_2'],
  createdAt: new Date(),
};

const restNumberFilter: RestNumberFilter = {
  _id: 'someNumberFilterId',
  type: RestTypeFilter.NumberFilter,
  name: 'someNumberFilter',
  valFilter: 1,
  createdAt: new Date(),
};

export { restCustomProfileFilter, restFilter, restNewFilter, restSliderFilter, restSelectFilter, restImageFilter, restNumberFilter };

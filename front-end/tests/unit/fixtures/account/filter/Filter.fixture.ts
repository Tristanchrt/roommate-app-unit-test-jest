import Filter, {
  CustomProfileFilter,
  ImageFilter,
  NumberFilter,
  SelectFilter,
  SliderFilter,
  TypeFilter,
} from '@/domain/account/filter/Filter';

const filter: Filter = {
  id: 'someFilterId',
  type: TypeFilter.Default,
  name: 'someFilterName',
  value: 'someValue',
};

const newFilter: Filter = {
  type: TypeFilter.Default,
  name: 'someFilterName',
  value: 'someValue',
};

const customProfileFilter: CustomProfileFilter = {
  id: 'someCustomProfileFilterId',
  type: TypeFilter.CustomProfileFilter,
  name: 'someCustomProfileFilterName',
  value: [
    {
      icon: 'someIcon',
      text: 'someText',
    },
    {
      icon: 'someIcon2',
      text: 'someText2',
    },
  ],
};

const sliderFilter: SliderFilter = {
  id: 'someSliderFilterId',
  type: TypeFilter.SliderFilter,
  name: 'someSliderFilter',
  value: [0, 100, 200],
};

const selectFilter: SelectFilter = {
  id: 'someSelectFilterId',
  type: TypeFilter.SelectFilter,
  name: 'someSelectFilter',
  value: ['value_1', 'value_2'],
};

const imageFilter: ImageFilter = {
  id: 'someImageFilterId',
  type: TypeFilter.ImageFilter,
  name: 'someImageFilter',
  value: ['france', 'spain'],
};

const numberFilter: NumberFilter = {
  id: 'someNumberFilterId',
  type: TypeFilter.NumberFilter,
  name: 'someNumberFilter',
  value: 1,
};

export { filter, newFilter, customProfileFilter, sliderFilter, imageFilter, selectFilter, numberFilter };

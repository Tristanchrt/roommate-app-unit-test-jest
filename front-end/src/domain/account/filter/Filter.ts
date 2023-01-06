export default interface Filter {
  id?: string;
  type: TypeFilter;
  name: string;
  value: any;
}

export enum TypeFilter {
  CustomProfileFilter = 'CustomProfileFilter',
  SelectFilter = 'SelectFilter',
  SliderFilter = 'SliderFilter',
  NumberFilter = 'NumberFilter',
  ImageFilter = 'ImageFilter',
  Default = 'Default',
}

export interface CustomProfileFilter extends Filter {
  type: TypeFilter.CustomProfileFilter;
  value: Array<{
    icon: string;
    text: string;
  }>;
}

export interface NumberFilter extends Filter {
  type: TypeFilter.NumberFilter;
  value: number;
}

export interface SliderFilter extends Filter {
  type: TypeFilter.SliderFilter;
  value: Array<Number>;
}

export interface SelectFilter extends Filter {
  type: TypeFilter.SelectFilter;
  value: Array<string>;
}

export interface ImageFilter extends Filter {
  type: TypeFilter.ImageFilter;
  value: Array<string>;
}

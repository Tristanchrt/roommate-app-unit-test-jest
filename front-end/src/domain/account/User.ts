import Filter from './filter/Filter';

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  description?: string;
  rating?: number;
  filters: Array<Filter>;
  birthDate: Date;
}

export interface UserPreview {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  description?: string;
  rating?: number;
  filters: Array<Filter>;
  birthDate: Date;
}

export enum Sex {
  male = 'male',
  female = 'female',
}

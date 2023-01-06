import { RestConversation } from '../restChat/RestConversation';

import { RestFilter, toFilter } from './filter/RestFilter';
import { RestReview } from './RestReview';

import { User, Sex } from '@/domain/account/User';

export interface RestUser {
  _id: string;
  token?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  localisation?: string;
  description?: string;
  avatar?: string;
  mark?: number;
  filters: Array<RestFilter>;
  sex: Sex;
  profilesSaved?: Array<RestUser>;
  reviews?: Array<RestReview>;
  createdAt: Date;
  conversations: Array<RestConversation>;
}

export const toUser = (restUser: RestUser): User => ({
  id: restUser._id,
  name: restUser.firstName + restUser.lastName,
  firstName: restUser.firstName,
  lastName: restUser.lastName,
  picture: restUser.avatar ? restUser.avatar : '',
  email: restUser.email,
  description: restUser.description,
  rating: restUser.mark,
  filters: restUser.filters.map(restFilter => toFilter(restFilter)),
  birthDate: restUser.birthDate,
});

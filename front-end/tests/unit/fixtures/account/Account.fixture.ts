import { filter, customProfileFilter } from './filter/Filter.fixture';
import { restCustomProfileFilter, restFilter } from './filter/RestFilter.fixture';

import { Sex, User } from '@/domain/account/User';
import { RestUser } from '@/secondary/restAccount/RestUser';

const franck: User = {
  id: 'franckId',
  name: 'FranckDsf',
  firstName: 'Franck',
  lastName: 'Desfrançais',
  email: 'FranckDesfrancais@gmail.com',
  picture: 'photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  filters: [],
  birthDate: new Date('11/11/1999'),
};

const tristan: User = {
  id: 'tristanId',
  name: 'TristanChr',
  firstName: 'Tristan',
  lastName: 'Chrétien',
  email: 'TristanChrétien@gmail.com',
  picture: 'o-a-simple-but-cool-profile-pic-or-logo-for-u.jpeg',
  filters: [],
  birthDate: new Date('01/10/2000'),
};

const joe: User = {
  id: 'joeMamId',
  name: 'JoeMam',
  firstName: 'Joseph',
  lastName: 'Triggered',
  email: 'JosephTriggered@gmail.com',
  picture: 'pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  filters: [],
  birthDate: new Date('10/10/1937'),
};
const clara: User = {
  id: 'claraId',
  name: 'ClaraDesfrançais',
  firstName: 'Clara',
  lastName: 'Desfrançais',
  email: 'claradesf@gmail.com',
  description: "Hello c'est clara",
  rating: 3,
  picture: 'pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  filters: [filter, customProfileFilter],
  birthDate: new Date('10/17/2001'),
};

const partialClara: User = {
  id: 'claraId',
  name: 'ClaraDesfrançais',
  firstName: 'Clara',
  lastName: 'Desfrançais',
  email: 'claradesf@gmail.com',
  picture: '',
  filters: [],
  birthDate: new Date('10/17/2001'),
};

const restClara: RestUser = {
  _id: 'claraId',
  token: 'someAuthorizationToken',
  email: 'claradesf@gmail.com',
  password: '12345689',
  firstName: 'Clara',
  lastName: 'Desfrançais',
  birthDate: new Date('10/17/2001'),
  localisation: 'France',
  description: "Hello c'est clara",
  avatar: 'pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  mark: 3,
  filters: [restFilter, restCustomProfileFilter],
  profilesSaved: [],
  reviews: [],
  sex: Sex.female,
  createdAt: new Date('20/10/2020'),
  conversations: [],
};

const restPartialClara: RestUser = {
  _id: 'claraId',
  token: 'someAuthorizationToken',
  email: 'claradesf@gmail.com',
  password: '12345689',
  firstName: 'Clara',
  lastName: 'Desfrançais',
  birthDate: new Date('10/17/2001'),
  filters: [],
  sex: Sex.female,
  createdAt: new Date('20/10/2020'),
  conversations: [],
};

export { restClara, restPartialClara, partialClara, joe, tristan, franck, clara };

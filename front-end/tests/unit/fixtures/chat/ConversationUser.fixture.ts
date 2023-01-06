import { ConversationUser } from '@/domain/chat/ConversationUser';
import { RestConversationUser } from '@/secondary/restChat/RestConversationUser';

const franckFromConversation: ConversationUser = {
  id: 'franckId',
  firstName: 'Franck',
  lastName: 'Desfrançais',
  picture: '',
};

const restFranckFromConversation: RestConversationUser = {
  _id: 'franckId',
  firstName: 'Franck',
  lastName: 'Desfrançais',
  avatar: undefined,
};

const tristanFromConversation: ConversationUser = {
  id: 'tristanId',
  firstName: 'Tristan',
  lastName: 'Chrétien',
  picture: 'https://fiverr-res.cloudinary.com/images/o-a-simple-but-cool-profile-pic-or-logo-for-u.jpeg',
};

const restTristanFromConversation: RestConversationUser = {
  _id: 'tristanId',
  firstName: 'Tristan',
  lastName: 'Chrétien',
  avatar: 'https://fiverr-res.cloudinary.com/images/o-a-simple-but-cool-profile-pic-or-logo-for-u.jpeg',
};

const joeFromConversation: ConversationUser = {
  id: 'joeMamId',
  firstName: 'Joseph',
  lastName: 'Triggered',
  picture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};

const restJoeFromConversation: RestConversationUser = {
  _id: 'joeMamId',
  firstName: 'Joseph',
  lastName: 'Triggered',
  avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};

const claraFromConversation: ConversationUser = {
  id: 'claraId',
  firstName: 'Clara',
  lastName: 'Desfrançais',
  picture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};

const restClaraFromConversation: RestConversationUser = {
  _id: 'claraId',
  firstName: 'Clara',
  lastName: 'Desfrançais',
  avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
};

export {
  claraFromConversation,
  restClaraFromConversation,
  joeFromConversation,
  restJoeFromConversation,
  franckFromConversation,
  restFranckFromConversation,
  tristanFromConversation,
  restTristanFromConversation,
};

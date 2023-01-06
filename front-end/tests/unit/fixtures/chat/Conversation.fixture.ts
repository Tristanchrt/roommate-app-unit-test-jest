import {
  franckFromConversation,
  joeFromConversation,
  restFranckFromConversation,
  restJoeFromConversation,
  restTristanFromConversation,
  tristanFromConversation,
} from './ConversationUser.fixture';
import {
  messageFranckTristan,
  messageFranckTristanJoe,
  messageTristanFranck,
  restMessageFranckTristan,
  restMessageFranckTristanJoe,
  restMessageTristanFranck,
} from './Message.fixture';

import { Conversation } from '@/domain/chat/Conversation';
import { RestConversation } from '@/secondary/restChat/RestConversation';

const conversationFranckTristanJoe: Conversation = {
  id: 'idOfFranckTristanJoeConversation',
  users: [franckFromConversation, tristanFromConversation, joeFromConversation],
  messages: [messageFranckTristanJoe],
};

const restConversationFranckTristanJoe: RestConversation = {
  _id: 'idOfFranckTristanJoeConversation',
  receivers: [restFranckFromConversation, restTristanFromConversation, restJoeFromConversation],
  messages: [restMessageFranckTristanJoe],
  createdAt: new Date('01/02/2020'),
};

const conversationFranckTristan: Conversation = {
  id: 'idOfFranckTristan',
  users: [franckFromConversation, tristanFromConversation],
  messages: [messageFranckTristan, messageTristanFranck],
};

const restConversationFranckTristan: RestConversation = {
  _id: 'idOfFranckTristan',
  receivers: [restFranckFromConversation, restTristanFromConversation],
  messages: [restMessageFranckTristan, restMessageTristanFranck],
  createdAt: new Date('11/11/1999'),
};

export { restConversationFranckTristan, conversationFranckTristanJoe, restConversationFranckTristanJoe, conversationFranckTristan };

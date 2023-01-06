import {
  franckFromConversation,
  restFranckFromConversation,
  restTristanFromConversation,
  tristanFromConversation,
} from './ConversationUser.fixture';

import { Message, TypeMessage } from '@/domain/chat/Message';
import { RestMessage } from '@/secondary/restChat/RestMessage';
import { RestSocketMessage } from '@/secondary/restSocket/RestSocketMessage';

const messageFranckTristanJoe: Message = {
  id: 'messageFranckTristanJoeID',
  conversationID: 'idOfFranckTristanJoeConversation',
  sender: franckFromConversation,
  content: 'Hello tu vas bien frero ?',
  type: TypeMessage.message,
};

const messageFranckTristan: Message = {
  id: 'messageFranckTristanID',
  conversationID: 'idOfFranckTristan',
  sender: franckFromConversation,
  content: "Tu fais quoi ce weekend ? Chaud d'aller boire un coup ?",
  type: TypeMessage.message,
};

const messageTristanFranck: Message = {
  id: 'messageTristanFranckID',
  conversationID: 'idOfFranckTristan',
  sender: tristanFromConversation,
  content: 'Bof la faut que je fasse un test covid ;)',
  type: TypeMessage.message,
};

const restMessageFranckTristanJoe: RestMessage = {
  _id: 'messageFranckTristanJoeID',
  conversationID: 'idOfFranckTristanJoeConversation',
  sender: restFranckFromConversation,
  message: 'Hello tu vas bien frero ?',
  date: new Date('01/02/2020'),
  type: 'message',
  seeOrNot: false,
};

const restMessageFranckTristan: RestMessage = {
  _id: 'messageFranckTristanID',
  conversationID: 'idOfFranckTristan',
  sender: restFranckFromConversation,
  message: "Tu fais quoi ce weekend ? Chaud d'aller boire un coup ?",
  date: new Date('11/11/1999'),
  type: 'message',
  seeOrNot: false,
};

const restMessageTristanFranck: RestMessage = {
  _id: 'messageTristanFranckID',
  conversationID: 'idOfFranckTristan',
  sender: restTristanFromConversation,
  message: 'Bof la faut que je fasse un test covid ;)',
  date: new Date('10/11/1999'),
  type: 'message',
  seeOrNot: true,
};

const restSocketMessageTristanFranck: RestSocketMessage = {
  _id: 'messageTristanFranckID',
  conversationID: 'idOfFranckTristan',
  sender: restTristanFromConversation,
  message: 'Bof la faut que je fasse un test covid ;)',
  type: 'message',
};

export {
  restSocketMessageTristanFranck,
  restMessageTristanFranck,
  restMessageFranckTristan,
  restMessageFranckTristanJoe,
  messageFranckTristanJoe,
  messageFranckTristan,
  messageTristanFranck,
};

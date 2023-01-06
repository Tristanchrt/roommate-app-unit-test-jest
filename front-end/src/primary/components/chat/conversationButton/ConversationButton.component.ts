import { Component, Prop, Vue } from 'vue-property-decorator';

import { User } from '@/domain/account/User';
import { Conversation } from '@/domain/chat/Conversation';
import { ConversationUser } from '@/domain/chat/ConversationUser';

@Component({})
export default class ConversationButtonComponent extends Vue {
  @Prop({ required: true })
  conversation!: Conversation;

  @Prop({ type: Boolean, default: false })
  isOpened!: Boolean;

  @Prop({ required: true })
  user!: User;

  @Prop({ default: 'regular' })
  size!: string;

  name = (): string => {
    let toDisplay: string = '';

    this.conversation.users.forEach(element => {
      if (element.id != this.user.id) toDisplay += element.firstName + ' ' + element.lastName + ', ';
    });

    toDisplay = toDisplay.trim();
    toDisplay = toDisplay.slice(0, -1);

    return toDisplay;
  };

  content = (): string => {
    let result: string = '';

    if (this.conversation.messages.length > 0) return this.conversation.messages[this.conversation.messages.length - 1].content;
    return result;
  };

  images = (): Array<string> => {
    let images: Array<string> = new Array<string>();
    const users = this.conversation.users;
    if (users.length < 4) {
      users.forEach(user => {
        images.push(this.senderPicture(user));
      });
    } else {
      users.forEach(user => {
        if (user.id != this.user.id) images.push(this.senderPicture(user));
      });
    }
    return images;
  };

  senderPicture = (sender: ConversationUser): string => {
    const CDN: string = 'http://localhost:4000/api/user/avatar';
    return `${CDN}/${sender.id}/${sender.picture}`;
  };
}

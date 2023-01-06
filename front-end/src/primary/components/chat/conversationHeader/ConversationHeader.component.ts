import { Component, Prop, Vue } from 'vue-property-decorator';

import { User } from '@/domain/account/User';
import { Conversation } from '@/domain/chat/Conversation';

@Component({})
export default class ConversationHeaderComponent extends Vue {
  @Prop({ required: true })
  conversation!: Conversation;

  @Prop({ required: true })
  user!: User;

  name = (): string => {
    let toDisplay: string = '';

    this.conversation.users.forEach(element => {
      if (element.id != this.user.id) toDisplay += element.firstName + ' ' + element.lastName + ', ';
    });

    toDisplay = toDisplay.trim();
    toDisplay = toDisplay.slice(0, -1);

    return toDisplay;
  };

  images = (): Array<string> => {
    let images: Array<string> = new Array<string>();
    const users = this.conversation.users;
    if (users.length < 4) {
      users.forEach(user => {
        images.push(user.picture);
      });
    } else {
      users.forEach(user => {
        if (user.id != this.user.id) images.push(user.picture);
      });
    }
    return images;
  };
}

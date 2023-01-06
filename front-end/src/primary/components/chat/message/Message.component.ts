import { Component, Prop, Vue } from 'vue-property-decorator';

import { TypeMessage, Message } from '@/domain/chat/Message';

@Component({})
export default class MessageComponent extends Vue {
  @Prop({ type: Boolean, required: true })
  isReceived!: Boolean;

  @Prop({ required: true })
  message!: Message;

  state: string = 'loading';

  sender = (): string => {
    return this.message.sender.firstName + ' ' + this.message.sender.lastName;
  };

  get imageURL(): string {
    const CDN: string = 'http://localhost:4000/api/user/message/file/';
    const URL: string = CDN + this.message.id + '/' + this.message.content;

    const image = new Image();
    image.onerror = () => (this.state = 'error');
    image.src = URL;

    return URL;
  }

  get senderPicture(): string {
    const CDN: string = 'http://localhost:4000/api/user/avatar';
    return `${CDN}/${this.message.sender.id}/${this.message.sender.picture}`;
  }
}

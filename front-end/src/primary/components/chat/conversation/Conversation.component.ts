import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { MessageVue } from '../message';

import { User } from '@/domain/account/User';
import { Conversation } from '@/domain/chat/Conversation';
import { Message, NewMessage, TypeMessage } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { ConversationHeaderVue } from '@/primary/components/chat/conversationHeader';

@Component({
  components: {
    MessageVue,
    ConversationHeaderVue,
  },
})
export default class ConversationComponent extends Vue {
  @Prop({ required: true })
  conversation!: Conversation;

  @Prop({ required: true })
  user!: User;

  @Inject()
  private socketRepository!: () => SocketRepository;

  input: string = '';
  containsFile: boolean = false;

  get loading(): boolean {
    if (this.conversation == null) return true;
    else return false;
  }

  async setTextAreaHeight() {
    const textArea: any = this.$el.querySelector('#input');
    textArea.removeAttribute('style');
    await this.$nextTick();
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  //scroll effect
  mounted() {
    if (!this.loading) this.scrollToBottom();
    this.$watch(
      () => this.loading,
      () => {
        if (!this.loading) this.scrollToBottom();
      }
    );
    this.$watch(
      () => this.conversation,
      () => {
        if (!this.loading) this.scrollIfConditionsFulFilled();
      }
    );
  }

  scrollToBottom() {
    const conversationContainer = this.$el.querySelector('#conversation');
    conversationContainer!.scrollTop = conversationContainer!.scrollHeight;
  }
  scrollIfConditionsFulFilled() {
    const conversationContainer = this.$el.querySelector('#conversation');
    if (conversationContainer?.scrollHeight! - (conversationContainer?.scrollTop! + conversationContainer?.clientHeight!) < 250)
      this.scrollToBottom();
  }

  selectFile() {
    (this.$refs.file as HTMLFormElement).click();
  }

  sendMessage(): void {
    const message: NewMessage = {
      conversationID: this.conversation!.id,
      senderID: this.user.id,
      content: this.input,
      type: TypeMessage.message,
    };

    this.input = '';
    this.setTextAreaHeight();
    this.socketRepository().sendMessage(message);
  }

  sendFile(): void {
    const message: NewMessage = {
      conversationID: this.conversation!.id,
      senderID: this.user.id,
      content: this.input,
      type: TypeMessage.file,
    };
    this.socketRepository().uploadFile(message, (this.$refs.file as HTMLFormElement).files[0]);

    (this.$refs.file as HTMLFormElement).value = null;
  }
}

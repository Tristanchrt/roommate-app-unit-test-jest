import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { StarsRatingVue } from '../../common/starsRating';

import { UserPreview } from '@/domain/account/User';
import { ChatRepository } from '@/domain/chat/ChatRepository';
import { Conversation } from '@/domain/chat/Conversation';
import { NewMessage, TypeMessage } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import ModalController from '@/primary/utils/ModalController';

@Component({ components: { StarsRatingVue } })
export default class UserModalComponent extends Vue {
  @Inject()
  private modalController!: () => ModalController;

  @Inject()
  private chatRepository!: () => ChatRepository;

  @Inject()
  private socketRepository!: () => SocketRepository;

  @Inject()
  private storeRepository!: () => StoreRepository;

  @Prop({ required: true })
  user!: UserPreview;

  input: string = '';

  get age(): number {
    var diff = new Date().getTime() - this.user.birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  close() {
    this.modalController().close();
  }

  async setTextAreaHeight() {
    const textArea: any = this.$el.querySelector('#input');
    textArea.removeAttribute('style');
    await this.$nextTick();
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  async sendMessage() {
    try {
      const conversation: Conversation = await this.chatRepository().createConversation([this.user.id]);
      const message: NewMessage = {
        conversationID: conversation!.id,
        senderID: this.storeRepository()
          .user()
          .getUser().id,
        content: this.input,
        type: TypeMessage.message,
      };
      await this.socketRepository().sendMessage(message);

      this.input = '';
      this.setTextAreaHeight();
      this.$router.push({ name: 'Chat', params: { id: conversation!.id } }).catch(() => {});
    } catch (error) {}
  }
}

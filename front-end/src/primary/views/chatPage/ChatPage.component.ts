import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { User } from '@/domain/account/User';
import { ChatRepository } from '@/domain/chat/ChatRepository';
import { Conversation } from '@/domain/chat/Conversation';
import { Message } from '@/domain/chat/Message';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { ConversationVue } from '@/primary/components/chat/conversation';
import { ConversationButtonVue } from '@/primary/components/chat/conversationButton'; // @ is an alias to /src
import { MessageVue } from '@/primary/components/chat/message'; // @ is an alias to /src
import RoutesController from '@/primary/utils/RoutesController';

@Component({
  components: {
    MessageVue,
    ConversationButtonVue,
    ConversationVue,
  },
})
export default class ChatPageComponent extends Vue {
  @Inject()
  private storeRepository!: () => StoreRepository;

  @Inject()
  private chatRepository!: () => ChatRepository;

  @Inject()
  private routesController!: () => RoutesController;

  conversations: Array<Conversation> = new Array<Conversation>();
  currentConversation: Conversation | null = null;
  input: string | null = null;
  user!: User;

  //ui
  loading: Boolean = true;
  conversationLoading: Boolean = false;
  windowWidth: number = 0;

  created() {
    if (!this.routesController().isUserAuthenticated()) return this.$router.push({ name: 'SignIn' }).catch(() => {});

    this.user = this.storeRepository()
      .user()
      .getUser();

    if (this.$route.params.id != null) {
      this.selectConversation(this.$route.params.id);
    }

    this.chatRepository()
      .getConversations()
      .then(result => {
        this.conversations = result;
        this.loading = false;
      })
      .catch(() => {
        this.$router.push({ name: 'Chat' }).catch(() => {});
      });

    this.$watch(
      () =>
        this.storeRepository()
          .socket()
          .getLastestMessage(),
      () =>
        this.setLastestMessage(
          this.storeRepository()
            .socket()
            .getLastestMessage()
        )
    );
  }

  setLastestMessage(lastestMessage: Message): void {
    const conversations: Conversation[] = this.conversations.map((conversation: Conversation) => {
      if (conversation.id == lastestMessage.conversationID) {
        const newConversation: Conversation = { ...conversation };
        newConversation.messages.push(lastestMessage);
        if (this.currentConversation && this.currentConversation!.id == conversation.id) this.currentConversation = newConversation;
        return newConversation;
      }
      return conversation;
    });
    this.conversations = conversations;
  }

  //ui
  selectConversation(conversationId: string): void {
    if (this.conversationLoading) return;
    this.conversationLoading = true;
    this.currentConversation = null;

    this.chatRepository()
      .getConversation(conversationId)
      .then((result: Conversation) => {
        this.currentConversation = result;
        this.conversationLoading = false;
        this.$router.push({ name: 'Chat', params: { id: this.currentConversation.id! } }).catch(() => {});
      })
      .catch(() => {
        this.conversationLoading = false;
        this.$router.push({ name: 'Chat' }).catch(() => {});
      });
  }

  mounted(): void {
    this.setWindowWidth();
    window.addEventListener('resize', () => {
      this.setWindowWidth();
    });
  }

  setWindowWidth(): void {
    this.windowWidth = window.innerWidth;
  }

  get device(): string {
    if (this.windowWidth > 950) return 'desktop';
    if (this.windowWidth > 550) return 'tablet';
    return 'mobile';
  }

  beforeDestroy(): void {
    /* istanbul ignore next */
    window.removeEventListener('resize', () => {
      this.setWindowWidth();
    });
  }
}

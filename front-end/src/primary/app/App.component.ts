import { Component, Inject, Vue } from 'vue-property-decorator';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { SocketRepository } from '@/domain/socket/SocketRepository';
import { StoreRepository } from '@/domain/store/StoreRepository';
import ModalController, { ModalOptions } from '@/primary/utils/ModalController';

@Component({})
export default class AppComponent extends Vue {
  @Inject()
  private accountRepository!: () => AccountRepository;

  @Inject()
  private socketRepository!: () => SocketRepository;

  @Inject()
  private storeRepository!: () => StoreRepository;

  @Inject()
  private modalController!: () => ModalController;

  listeningToUserToken?: number;
  userToken?: string;
  loading: boolean = false;
  modal: ModalOptions | null = null;

  created() {
    this.modalController().init(
      (modal: ModalOptions) => {
        this.modal = {
          component: modal.component,
          props: modal.props,
        };
      },
      () => (this.modal = null)
    );

    if (
      this.storeRepository()
        .user()
        .getToken() != null
    ) {
      this.loading = true;
      this.accountRepository()
        .getMe()
        .then(() => {
          this.loading = false;
          this.initSocketRepository();
        })
        .catch(() => {
          this.loading = false;
          this.storeRepository()
            .user()
            .resetState();
          this.$router.push({ name: 'SignIn' }).catch(() => {});
        });
    }
  }

  initSocketRepository() {
    this.listeningToUserToken = setInterval(() => {
      if (
        this.userToken == null &&
        this.storeRepository()
          .user()
          .getToken() != null
      ) {
        this.socketRepository().init();
      } else if (
        this.userToken != null &&
        this.storeRepository()
          .user()
          .getToken() == null
      ) {
        this.socketRepository().destroy();
      }
      this.userToken = this.storeRepository()
        .user()
        .getToken();
    }, 1000);
  }

  beforeDestroy() {
    clearInterval(this.listeningToUserToken);
    this.listeningToUserToken = undefined;
  }
}

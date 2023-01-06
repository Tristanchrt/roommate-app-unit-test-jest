import { Component, Inject, Vue } from 'vue-property-decorator';

import { AccountRepository } from '@/domain/account/AccountRepository';
import { User } from '@/domain/account/User';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { StarsRatingVue } from '@/primary/components/common/starsRating';
import { CustomProfileFilterVue } from '@/primary/components/filters/elements/customProfileFilterSelector/customProfileFilter';
import RoutesController from '@/primary/utils/RoutesController';

@Component({
  components: {
    CustomProfileFilterVue,
    StarsRatingVue,
  },
})
export default class ProfilePageComponent extends Vue {
  @Inject()
  private storeRepository!: () => StoreRepository;

  @Inject()
  private routesController!: () => RoutesController;

  @Inject()
  private accountRepository!: () => AccountRepository;

  user: User | null = null;
  description: string = '';

  created() {
    if (!this.routesController().isUserAuthenticated()) return this.$router.push({ name: 'SignIn' }).catch(() => {});

    this.user = this.storeRepository()
      .user()
      .getUser();

    this.description = this.user.description ? this.user.description : '';
  }

  async setTextAreaHeight() {
    const textArea: any = this.$el.querySelector('#input');
    textArea.removeAttribute('style');
    await this.$nextTick();
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  modifyFilters() {
    this.$router.push({ name: 'Filters' }).catch(() => {});
  }

  triggerInputFile() {
    (this.$refs.file as HTMLFormElement).click();
  }

  changePicture() {
    this.accountRepository()
      .updateProfilePicture((this.$refs.file as HTMLFormElement).files[0])
      .then(async user => {
        this.user = null;
        await this.$nextTick();
        this.user = { ...user };
      })
      .catch(() => {});
    (this.$refs.file as HTMLFormElement).value = '';
  }

  get profilePicture(): null | string {
    if (this.user!.picture.length <= 0) return null;
    const CDN: string = 'http://localhost:4000/api/user/avatar';
    return `${CDN}/${this.user!.id}/${this.user!.picture}`;
  }
}

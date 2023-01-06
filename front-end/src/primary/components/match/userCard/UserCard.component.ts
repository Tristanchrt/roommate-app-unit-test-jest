import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { UserModalVue } from '../userModal';

import { UserPreview } from '@/domain/account/User';
import ModalController from '@/primary/utils/ModalController';

@Component({})
export default class UserCardComponent extends Vue {
  @Inject()
  private modalController!: () => ModalController;

  @Prop({ required: true })
  user!: UserPreview;

  openModal() {
    this.modalController().open({ component: UserModalVue, props: { user: this.user } });
  }
}

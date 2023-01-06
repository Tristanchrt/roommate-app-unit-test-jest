import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { CustomProfileFilterModalVue } from '../customProfileFilterModal';

import { AccountRepository } from '@/domain/account/AccountRepository';
import ModalController from '@/primary/utils/ModalController';

@Component({})
export default class CustomProfileFilterComponent extends Vue {
  @Inject()
  private modalController!: () => ModalController;

  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ default: false })
  editable?: boolean;

  edit(): void {
    if (!this.editable) return;
    this.modalController().open({ component: CustomProfileFilterModalVue, props: { icon: this.icon, text: this.text } });
    this.modalController().onClose((data: { icon: string; text: string } | undefined) => {
      if (data && (data.icon != this.icon || data.text != this.text)) {
        this.$emit('update', { ...data, id: this.id });
      }
    });
  }

  deleteElement(): void {
    this.$emit('delete', this.id);
  }
}

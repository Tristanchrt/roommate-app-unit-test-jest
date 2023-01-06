import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import emojis from '@/assets/modules/emojis';
import ModalController from '@/primary/utils/ModalController';

@Component({})
export default class CustomProfileFilterModalComponent extends Vue {
  @Inject()
  private modalController!: () => ModalController;

  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  text!: string;

  newInput: string = '';
  newIcon: string = '';

  icons: Array<string> = emojis;

  beforeCreate() {
    this.$options.components!.CustomProfileFilterVue = require('../customProfileFilter/CustomProfileFilter.vue').default;
  }

  created() {
    this.newInput = this.text;
    this.newIcon = this.icon;
  }

  close() {
    this.modalController().close();
  }
  save() {
    this.modalController().close({ text: this.newInput.substring(0, 20).trim(), icon: this.newIcon });
  }

  selectIcon(element: string) {
    this.newIcon = element;
  }

  scrollTop() {
    const container = this.$el.querySelector('.modal > .container');
    container!.scrollTop = 0;
  }
}

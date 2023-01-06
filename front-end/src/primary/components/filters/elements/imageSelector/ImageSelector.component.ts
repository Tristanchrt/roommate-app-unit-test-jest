import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { TypeFilter } from '@/domain/account/filter/Filter';

export interface ImageSelector {
  image: string;
  value: string;
}

@Component({})
export default class ImageSelectorComponent extends Vue {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  options!: Array<ImageSelector>;
  @Prop({ default: true })
  multiple?: boolean;
  @Prop()
  initialValue?: Array<string>;

  values: Array<string> = [];

  created() {
    this.values = this.initialValue ? [...this.initialValue] : [];

    this.$watch(
      () => this.values,
      () => this.$emit('change', { type: TypeFilter.ImageFilter, value: this.values })
    );
  }

  toggleImage(value: string) {
    if (!this.values.includes(value)) {
      this.values.push(value);
    } else {
      this.values = this.values.filter(val => value != val);
    }
    this.singleController();
  }

  singleController() {
    if (!this.multiple && this.values.length > 1) this.values = [this.values[1]];
  }
}

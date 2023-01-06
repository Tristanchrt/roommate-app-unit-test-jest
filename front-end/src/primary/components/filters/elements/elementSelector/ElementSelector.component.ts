import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { TypeFilter } from '@/domain/account/filter/Filter';

@Component({})
export default class ElementSelectorComponent extends Vue {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  options!: Array<string>;

  @Prop()
  initialValue?: Array<string>;

  @Prop({ default: true })
  multiple?: boolean;

  values: Array<string> = [];

  created() {
    this.values = this.initialValue ? [...this.initialValue] : [];

    this.$watch(
      () => this.values,
      () => this.$emit('change', { type: TypeFilter.SelectFilter, value: this.values })
    );
  }

  isSelected(value: string): boolean {
    return this.values.includes(value);
  }

  toggleSelect(value: string) {
    if (!this.isSelected(value)) {
      this.values.push(value);
    } else {
      this.values = this.values.filter(val => val != value);
    }
    this.singleController();
  }

  singleController() {
    if (!this.multiple && this.values.length > 1) this.values = [this.values[1]];
  }
}

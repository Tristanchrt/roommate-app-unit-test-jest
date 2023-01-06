import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { TypeFilter } from '@/domain/account/filter/Filter';

@Component({})
export default class SelectFilterComponent extends Vue {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  options!: Array<string>;
  @Prop({ default: true })
  multiple?: boolean;
  @Prop()
  initialValue?: Array<string>;

  values: Array<string> = [];

  created() {
    this.values = this.initialValue ? [...this.initialValue] : [];

    this.$watch(
      () => this.values,
      () => this.$emit('change', { type: TypeFilter.SelectFilter, value: this.values })
    );
  }

  onChange(event: any) {
    if (!this.values.includes(event.target.value)) {
      this.values.push(event.target.value);
    }
    event.target.value = '';
    this.singleController();
  }
  remove(value: string) {
    this.values = this.values.filter(val => value != val);
    this.singleController();
  }

  singleController() {
    if (!this.multiple && this.values.length > 1) this.values = [this.values[1]];
  }
}

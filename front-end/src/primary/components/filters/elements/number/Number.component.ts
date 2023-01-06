import { Component, Emit, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { TypeFilter } from '@/domain/account/filter/Filter';

@Component({})
export default class NumberFilterComponent extends Vue {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  content!: string;
  @Prop({ required: true })
  min!: number;
  @Prop({ required: true })
  max!: number;
  @Prop({ required: true })
  step!: number;
  @Prop()
  initialValue?: number;

  value: number | null = this.min;

  timeout: number | null = null;

  created() {
    this.value = this.initialValue ? this.initialValue : this.min;
  }

  @Watch('value')
  onValueChanged(newValue: number, oldValue: number) {
    if (newValue == null || newValue < this.min) this.value = this.min;
    if (newValue > this.max) this.value = this.max;

    if (this.timeout != null) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.$emit('change', { type: TypeFilter.NumberFilter, value: this.value });
      this.timeout = null;
    }, 500);
  }
}

import { VueConstructor } from 'vue';
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import VueSlider from 'vue-slider-component';

import { TypeFilter } from '@/domain/account/filter/Filter';
import 'vue-slider-component/theme/default.css';

export interface SliderRange {
  min: number;
  max: number;
}
@Component({
  components: {
    VueSlider: VueSlider,
  },
})
export default class SliderFilterComponent extends Vue {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  step!: number;
  @Prop({ required: true })
  range!: SliderRange;
  @Prop()
  initialValue?: Array<number>;

  values: Array<number> = [];

  sliderOptions: object = {
    'enable-cross': false,
    contained: true,
    tooltip: 'always',
  };

  timeout: number | null = null;

  created() {
    this.values = this.initialValue ? [...this.initialValue] : [this.range.min, this.range.max];

    this.$watch(
      () => this.values,
      () => this.checkForChanges()
    );
  }

  checkForChanges() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.$emit('change', { type: TypeFilter.SliderFilter, value: this.values });
      this.timeout = null;
    }, 1000);
  }
}

import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class StarsRatingComponent extends Vue {
  @Prop({})
  rating!: number;

  get fullStars() {
    return Math.floor(this.rating);
  }

  get halfStars() {
    return Math.ceil(this.rating % 1);
  }
}

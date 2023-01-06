import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { stubRouter } from '../../../Utils';

import { StarsRatingComponent, StarsRatingVue } from '@/primary/components/common/starsRating';

let wrapper: Wrapper<StarsRatingComponent>;
let component: StarsRatingComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = (rating: number) => {
  wrapper = shallowMount<StarsRatingComponent>(StarsRatingVue, {
    propsData: {
      rating: rating,
    },
  });
  component = wrapper.vm;
};

describe('Stars Rating component', () => {
  it('Should exists', () => {
    wrap(1);
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly get stars from rating number', () => {
    wrap(4.3);

    expect(component.fullStars).toBe(4);
    expect(component.halfStars).toBe(1);

    wrap(0.7);

    expect(component.fullStars).toBe(0);
    expect(component.halfStars).toBe(1);

    wrap(0);

    expect(component.fullStars).toBe(0);
    expect(component.halfStars).toBe(0);
  });
});

import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { stubRouter } from '../../../Utils';

import { HomePageComponent, HomePageVue } from '@/primary/views/homePage';

let wrapper: Wrapper<HomePageComponent>;
let component: HomePageComponent;

const $router: VueRouter = stubRouter();
const wrap = () => {
  wrapper = shallowMount<HomePageComponent>(HomePageVue, {
    mocks: {
      $router,
    },
  });
  component = wrapper.vm;
};

describe('Home page', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
});

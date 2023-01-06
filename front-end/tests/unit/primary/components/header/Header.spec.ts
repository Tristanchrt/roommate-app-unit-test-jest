import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { stubRouter } from '../../../Utils';

import { HeaderComponent, HeaderVue } from '@/primary/components/header';

let wrapper: Wrapper<HeaderComponent>;
let component: HeaderComponent;

const $router: VueRouter = stubRouter();
const $route: Partial<Route> = {};

const wrap = () => {
  wrapper = shallowMount<HeaderComponent>(HeaderVue, {
    mocks: {
      $router: $router,
      $route: $route,
    },
    stubs: ['router-link', 'router-view'],
  });
  component = wrapper.vm;
};

describe('Header component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
});

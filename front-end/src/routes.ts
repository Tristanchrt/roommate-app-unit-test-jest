import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { HeaderVue } from './primary/components/header';
import { ChatPageVue } from './primary/views/chatPage';
import { FiltersPageVue } from './primary/views/filtersPage';
import { HomePageVue } from './primary/views/homePage';
import { MatchPageVue } from './primary/views/matchPage';
import { ProfilePageVue } from './primary/views/profilePage';
import { SignInPageVue } from './primary/views/signInPage';
import { SignUpPageVue } from './primary/views/signUpPage';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    components: {
      header: HeaderVue,
      default: HomePageVue,
    },
  },
  {
    path: '/explore',
    name: 'Explore',
    components: {
      header: HeaderVue,
      default: MatchPageVue,
    },
  },
  {
    path: '/sign',
    redirect: { path: '/sign/in' },
  },
  {
    path: '/sign/in',
    name: 'SignIn',
    components: {
      default: SignInPageVue,
    },
  },
  {
    path: '/sign/up',
    name: 'SignUp',
    components: {
      default: SignUpPageVue,
    },
  },
  {
    path: '/messages/:id?',
    name: 'Chat',
    components: {
      header: HeaderVue,
      default: ChatPageVue,
    },
  },
  {
    path: '/profile/filters',
    name: 'Filters',
    components: {
      header: HeaderVue,
      default: FiltersPageVue,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    components: {
      header: HeaderVue,
      default: ProfilePageVue,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import { Component, Inject, Vue } from 'vue-property-decorator';

import { User, UserPreview } from '@/domain/account/User';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { UserCardVue } from '@/primary/components/match/userCard';
import RoutesController from '@/primary/utils/RoutesController';

const users: Array<UserPreview> = [
  {
    id: 'franckId',
    name: 'FranckDsf',
    firstName: 'Franck',
    lastName: 'Desfrançais',
    picture: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    filters: [],
    rating: 2.3,
    birthDate: new Date('11/11/1999'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue diam orci, at tincidunt lacus iaculis ac. Duis nec orci a est bibendum faucibus eu eu mi. Aenean dapibus risus pharetra ante sollicitudin, et efficitur tortor pretium. Nam tortor tellus, elementum ut ullamcorper iaculis, fermentum tempus neque.',
  },
  {
    id: 'tristanId',
    name: 'TristanChr',
    firstName: 'Tristan',
    lastName: 'Chrétien',
    picture: 'https://fiverr-res.cloudinary.com/images/o-a-simple-but-cool-profile-pic-or-logo-for-u.jpeg',
    filters: [],
    birthDate: new Date('01/10/2000'),
  },
  {
    id: 'joeMamId',
    name: 'JoeMam',
    firstName: 'Joseph',
    lastName: 'Triggered',
    picture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    filters: [],
    birthDate: new Date('10/17/1901'),
  },
  {
    id: 'claraId',
    name: 'ClaraDesfrançais',
    firstName: 'Clara',
    lastName: 'Desfrançais',
    description: "Hello c'est clara",
    rating: 3,
    picture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    filters: [],
    birthDate: new Date('10/17/2001'),
  },
];

@Component({ components: { UserCardVue } })
export default class MatchPageComponent extends Vue {
  @Inject()
  private storeRepository!: () => StoreRepository;

  @Inject()
  private routesController!: () => RoutesController;

  user!: User;
  matchs: Array<UserPreview> = [];

  created() {
    if (!this.routesController().isUserAuthenticated()) return this.$router.push({ name: 'SignIn' }).catch(() => {});

    this.user = this.storeRepository()
      .user()
      .getUser();

    this.matchs = [...users];
  }
}

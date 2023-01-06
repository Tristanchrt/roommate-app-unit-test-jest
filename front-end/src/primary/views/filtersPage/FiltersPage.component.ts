import { VueConstructor } from 'vue';
import { Component, Inject, Vue } from 'vue-property-decorator';

import { User } from '@/domain/account/User';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { HobbiesCategoryVue } from '@/primary/components/filters/categories/hobbies';
import RoutesController from '@/primary/utils/RoutesController';

interface Categorie {
  name: string;
  component?: VueConstructor;
  selected: boolean;
}

@Component({})
export default class FiltersPageComponent extends Vue {
  @Inject()
  storeRepository!: () => StoreRepository;

  @Inject()
  routesController!: () => RoutesController;

  user!: User;

  //TODO CREATE CATEGORIES
  categories: Array<Categorie> = [
    { name: '🪀 Hobbies', component: HobbiesCategoryVue, selected: false },
    { name: '🌝 Personal Information', selected: false },
    { name: '🏢 Floor', selected: false },
    { name: '🎉 Life Style', selected: false },
  ];

  selectedCategorie!: Categorie;

  created() {
    if (!this.routesController().isUserAuthenticated()) return this.$router.push({ name: 'SignIn' }).catch(() => {});

    this.user = this.storeRepository()
      .user()
      .getUser();

    this.selectCategorie(0);
  }

  selectCategorie(index: number) {
    this.categories.forEach(categorie => (categorie.selected = false));
    this.categories[index].selected = true;
    this.selectedCategorie = this.categories[index];
  }
}

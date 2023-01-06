import { Component, Inject, Provide, Vue } from 'vue-property-decorator';

import BackgroundSVG from './assets/Background.vue';

import { AccountRepository } from '@/domain/account/AccountRepository';

@Component({
  components: { BackgroundSVG },
})
export default class SignInPageComponent extends Vue {
  @Inject()
  private accountRepository!: () => AccountRepository;

  email: string = '';
  password: string = '';

  signIn() {
    if (this.email.length < 1 || this.password.length < 1) return;

    this.accountRepository()
      .signIn(this.email, this.password)
      .then(() => {
        this.$router.push({ name: 'Explore' }).catch(() => {});
      })
      .catch(() => {
        this.password = '';
      });
  }
}

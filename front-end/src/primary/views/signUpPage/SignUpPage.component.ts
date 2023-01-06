import { Component, Vue, Inject } from 'vue-property-decorator';

import BackgroundSVG from './assets/Background.vue';

import { AccountRepository } from '@/domain/account/AccountRepository';

@Component({
  components: { BackgroundSVG },
})
export default class SignUpPageComponent extends Vue {
  @Inject()
  private accountRepository!: () => AccountRepository;

  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  birthdate: Date | null = null;
  confirmPassword: string = '';

  isApiCalled: boolean = false;

  get doPasswordsMatch(): boolean {
    if (this.password == this.confirmPassword && this.password.length > 0) return true;
    return false;
  }

  get canSignUp(): boolean {
    if (
      !this.doPasswordsMatch ||
      this.email.length < 1 ||
      this.firstName.length < 1 ||
      this.lastName.length < 1 ||
      this.birthdate == null ||
      this.isApiCalled
    )
      return false;
    return true;
  }

  async signUp() {
    if (!this.canSignUp) return;

    this.isApiCalled = true;
    await this.accountRepository()
      .signUp(this.firstName, this.lastName, this.birthdate!, this.email, this.password)
      .then(() => {
        this.$router.push({ name: 'Filters' }).catch(() => {});
      })
      .catch(() => {});

    this.isApiCalled = false;
  }
}

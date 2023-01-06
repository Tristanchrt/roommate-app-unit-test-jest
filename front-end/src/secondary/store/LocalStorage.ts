export class LocalStorage {
  static userToken: string = 'token';

  static setUserToken(token: string) {
    localStorage.setItem(this.userToken, token!);
  }

  static removeUserToken(): boolean {
    localStorage.removeItem(this.userToken);
    return true;
  }

  static getUserToken(): string | null {
    return localStorage.getItem(this.userToken);
  }
}

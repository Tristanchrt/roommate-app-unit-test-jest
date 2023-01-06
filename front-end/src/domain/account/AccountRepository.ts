import Filter from './filter/Filter';
import { User } from './User';

export interface AccountRepository {
  signIn(email: string, password: string): Promise<User>;
  signUp(firstName: string, lastName: string, birthdate: Date, email: string, password: string): Promise<User>;
  getMe(): Promise<User>;
  updateFilter(filter: Filter): Promise<Array<Filter>>;
  updateFilters(filters: Array<Filter>): Promise<Array<Filter>>;
  updateProfilePicture(file: Blob): Promise<User>;
}

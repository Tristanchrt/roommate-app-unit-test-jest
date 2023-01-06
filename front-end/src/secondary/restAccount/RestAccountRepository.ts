import { AxiosInstance, AxiosResponse } from 'axios';

import { RestFilter, RestNewFilter, toFilter, toRestNewFilter } from './filter/RestFilter';
import { RestUser, toUser } from './RestUser';

import { AccountRepository } from '@/domain/account/AccountRepository';
import Filter from '@/domain/account/filter/Filter';
import { User } from '@/domain/account/User';
import { StoreRepository } from '@/domain/store/StoreRepository';

export default class RestAccountRepository implements AccountRepository {
  storeRepository: StoreRepository;
  axiosInstance: AxiosInstance;
  baseURL: string;
  constructor(storeRepository: StoreRepository, axiosInstance: AxiosInstance) {
    this.storeRepository = storeRepository;
    this.axiosInstance = axiosInstance;
    this.baseURL = '/user';
  }
  async signIn(email: string, password: string): Promise<User> {
    return this.axiosInstance
      .post(this.baseURL + '/connect', {
        email: email,
        password: password,
      })
      .then((response: AxiosResponse<RestUser>) => {
        const user = toUser(response.data);
        this.storeRepository.user().setUser(user);
        this.storeRepository.user().setToken(response.data.token!);
        return user;
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  async signUp(firstName: string, lastName: string, birthdate: Date, email: string, password: string): Promise<User> {
    return this.axiosInstance
      .post(this.baseURL + '/signup', {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthdate,
        email: email,
        password: password,
      })
      .then((response: AxiosResponse<RestUser>) => {
        const user = toUser(response.data);
        this.storeRepository.user().setUser(user);
        this.storeRepository.user().setToken(response.data.token!);
        return user;
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  async getMe(): Promise<User> {
    return this.axiosInstance
      .get(this.baseURL + '/me', {
        headers: {
          Authorization: this.storeRepository.user().getToken(),
        },
      })
      .then((response: AxiosResponse<RestUser>) => {
        const user = toUser(response.data);
        this.storeRepository.user().setUser(user);
        return user;
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  async updateFilter(filter: Filter): Promise<Filter[]> {
    let filters = [...this.storeRepository.user().getUser().filters];
    const index = filters.findIndex(filt => filt.name == filter.name);
    if (index != -1) filters[index] = filter;
    else filters.push(filter);

    return await this.updateFilters(filters);
  }

  async updateFilters(filters: Array<Filter>): Promise<Filter[]> {
    const restFilters: Array<RestNewFilter> = filters.map(filter => toRestNewFilter(filter));
    return this.axiosInstance
      .put(
        this.baseURL + '/filter',
        {
          filters: restFilters,
        },
        {
          headers: {
            Authorization: this.storeRepository.user().getToken(),
          },
        }
      )
      .then((response: AxiosResponse<Array<RestFilter>>) => {
        const filters = response.data.map(restFilter => toFilter(restFilter));
        this.storeRepository.user().setFilters(filters);
        return filters;
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }

  async updateProfilePicture(picture: Blob): Promise<User> {
    const formData = new FormData();
    formData.append('picture', picture);

    return this.axiosInstance
      .put(this.baseURL + '/avatar', formData, {
        headers: {
          Authorization: this.storeRepository.user().getToken(),
        },
      })
      .then((response: AxiosResponse<RestUser>) => {
        const user = toUser(response.data);
        this.storeRepository.user().setUser(user);
        return user;
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }
}

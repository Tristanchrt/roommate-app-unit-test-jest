import { clara, franck, partialClara, restClara, restPartialClara, tristan } from '../fixtures/account/Account.fixture';
import {
  filter,
  customProfileFilter,
  sliderFilter,
  numberFilter,
  selectFilter,
  imageFilter,
  newFilter,
} from '../fixtures/account/filter/Filter.fixture';
import {
  restCustomProfileFilter,
  restFilter,
  restImageFilter,
  restNewFilter,
  restNumberFilter,
  restSelectFilter,
  restSliderFilter,
} from '../fixtures/account/filter/RestFilter.fixture';
import { resolveStoreRepository } from '../fixtures/store/StoreRepository.fixture';
import { customError, stubAxiosInstance } from '../Utils';

import { User } from '@/domain/account/User';
import RestAccountRepository from '@/secondary/restAccount/RestAccountRepository';

describe('RestAccountRepository', () => {
  it('Should fail to sign in', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.post.rejects(customError(500, "Can't get account: Network Error"));
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    await restAccountRepository.signIn('someEmail', 'somePassword').catch(error => {
      expect(error).toEqual(Error("Can't get account: Network Error"));
    });
  });
  it('Should correctly sign in with good credentials', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.post.resolves({ data: restClara });
    const storeRepository = resolveStoreRepository();

    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);
    const setUserTokenToStore = jest.spyOn(storeRepository.user(), 'setToken');

    const user: User = await restAccountRepository.signIn('someEmail', 'somePassword');
    expect(user).toEqual(clara);
    expect(setUserTokenToStore).toBeCalledWith('someAuthorizationToken');
  });
  it('Should correctly convert a back end user to a front user', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.post.resolves({ data: restPartialClara });
    const storeRepository = resolveStoreRepository();

    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);
    const setUserTokenToStore = jest.spyOn(storeRepository.user(), 'setToken');

    const user: User = await restAccountRepository.signIn('someEmail', 'somePassword');
    expect(user).toEqual(partialClara);
    expect(setUserTokenToStore).toBeCalledWith('someAuthorizationToken');
  });
  it('Should correctly retrieve user profile', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: franck });
    const storeRepository = resolveStoreRepository();
    const setUser = jest.spyOn(storeRepository.user(), 'setUser');
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    const user = await restAccountRepository.getMe();

    expect(axiosGet).toBeCalledWith('/user/me', {
      headers: {
        Authorization: storeRepository.user().getToken(),
      },
    });
    expect(setUser).toBeCalledWith(user);
  });
  it('Should fail to retrieve user profile', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.get.rejects(customError(500, "Can't get account: Network Error"));
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    await restAccountRepository.getMe().catch(error => {
      expect(error).toEqual(Error("Can't get account: Network Error"));
    });
  });
  it('Should fail to sign up if some error occurs in back-end', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.post.rejects(customError(500, "Can't sign up: Network Error"));
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);
    await restAccountRepository.signUp('someFirstName', 'someLastName', new Date(), 'someEmail', 'somePassword').catch(error => {
      expect(error).toEqual(Error("Can't sign up: Network Error"));
    });
  });
  it('Should correctly sign up with good credentials', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.post.resolves({ data: restClara });
    const storeRepository = resolveStoreRepository();
    const setUserTokenToStore = jest.spyOn(storeRepository.user(), 'setToken');
    const setUserToStore = jest.spyOn(storeRepository.user(), 'setUser');
    const axiosPost = jest.spyOn(axiosInstance, 'post');
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    const date = new Date();
    const user = await restAccountRepository.signUp('someFirstName', 'someLastName', date, 'someEmail', 'somePassword');
    expect(axiosPost).toBeCalledWith('/user/signup', {
      firstName: 'someFirstName',
      lastName: 'someLastName',
      birthDate: date,
      email: 'someEmail',
      password: 'somePassword',
    });
    expect(setUserToStore).toBeCalledWith(clara);
    expect(setUserTokenToStore).toBeCalledWith('someAuthorizationToken');
    expect(user).toEqual(clara);
  });
  it('Should fail to update a filter if some error occurs in back-end', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    ((restAccountRepository.updateFilters = jest.fn()) as jest.Mock).mockRejectedValueOnce(Error("Can't sign up: Network Error"));
    await restAccountRepository.updateFilter(filter).catch(error => {
      expect(error).toEqual(Error("Can't sign up: Network Error"));
    });
  });
  it("Should correctly add a filter if it desn't exist already", async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    const user = { ...tristan };
    user.filters = [];

    expect(user.filters).not.toContainEqual(filter);
    storeRepository.user().getUser.returns(user);
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);
    const updateFilters = ((restAccountRepository.updateFilters = jest.fn()) as jest.Mock).mockResolvedValue([filter]);

    const result = await restAccountRepository.updateFilter(filter);

    expect(updateFilters).toBeCalledWith([filter]);
    expect(result).toEqual([filter]);
  });
  it('Should correctly update a filter already existing', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    const testedFilter = { ...filter, name: 'TESTING_FILTER', value: 0 };
    const updatedFilter = { ...filter, name: 'TESTING_FILTER', value: 1 };
    const user = { ...tristan };
    user.filters = [...user.filters, testedFilter];

    storeRepository.user().getUser.returns(user);
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    const updateFilters = ((restAccountRepository.updateFilters = jest.fn()) as jest.Mock).mockResolvedValue([
      ...tristan.filters,
      updatedFilter,
    ]);

    const result = await restAccountRepository.updateFilter(updatedFilter);
    expect(updateFilters).toBeCalledWith([...tristan.filters, updatedFilter]);
    expect(result).toEqual([...tristan.filters, updatedFilter]);
  });
  it('Should correctly update filters', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.put.resolves({
      data: [restFilter, restSliderFilter, restNumberFilter, restSelectFilter, restImageFilter, restCustomProfileFilter],
    });
    const axiosPut = jest.spyOn(axiosInstance, 'put');

    const storeRepository = resolveStoreRepository();
    const setFilterStore = jest.spyOn(storeRepository.user(), 'setFilters');
    storeRepository.user().getToken.returns('someToken');

    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    const accountUpdateFilters = await restAccountRepository.updateFilters([
      filter,
      sliderFilter,
      numberFilter,
      selectFilter,
      imageFilter,
      customProfileFilter,
    ]);

    expect(axiosPut).toBeCalledWith(
      '/user/filter',
      {
        filters: [
          restNewFilter,
          { ...restSliderFilter, _id: undefined, createdAt: undefined },
          { ...restNumberFilter, _id: undefined, createdAt: undefined },
          { ...restSelectFilter, _id: undefined, createdAt: undefined },
          { ...restImageFilter, _id: undefined, createdAt: undefined },
          { ...restCustomProfileFilter, _id: undefined, createdAt: undefined },
        ],
      },
      {
        headers: {
          Authorization: 'someToken',
        },
      }
    );
    expect(setFilterStore).toBeCalledWith([filter, sliderFilter, numberFilter, selectFilter, imageFilter, customProfileFilter]);
    expect(accountUpdateFilters).toEqual([filter, sliderFilter, numberFilter, selectFilter, imageFilter, customProfileFilter]);
  });
  it('Should fail to filters if some error occurs in back-end', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.put.rejects(customError(500, "Can't sign up: Network Error"));
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);
    await restAccountRepository.updateFilters([filter]).catch(error => {
      expect(error).toEqual(Error("Can't sign up: Network Error"));
    });
  });
  it('Should fail to update profile picture', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.put.rejects(customError(500, "Can't sign up: Network Error"));
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    const file: Blob = new Blob();

    await restAccountRepository.updateProfilePicture(file).catch(error => {
      expect(error).toEqual(Error("Can't sign up: Network Error"));
    });
  });
  it('Should correctly update profile picture', async () => {
    const axiosInstance = stubAxiosInstance();
    const storeRepository = resolveStoreRepository();
    axiosInstance.put.resolves({ data: restClara });
    const restAccountRepository = new RestAccountRepository(storeRepository, axiosInstance);

    const file: Blob = new Blob();

    const setUser = jest.spyOn(storeRepository.user(), 'setUser');
    const result = await restAccountRepository.updateProfilePicture(file);
    expect(setUser).toBeCalledTimes(1);
    expect(setUser).toBeCalledWith(clara);
    expect(result).toEqual(clara);
  });
});

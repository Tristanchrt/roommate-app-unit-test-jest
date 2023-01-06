import sinon, { SinonStub } from 'sinon';

import { AxiosError } from 'axios';

import { franck } from './Account.fixture';

import { AccountRepository } from '@/domain/account/AccountRepository';

interface RestAccountRepositoryStub extends AccountRepository {
  signIn: SinonStub;
  signUp: SinonStub;
  getMe: SinonStub;
  updateFilter: SinonStub;
  updateFilters: SinonStub;
  updateProfilePicture: SinonStub;
}
export const stubAccountRepository = (): RestAccountRepositoryStub => ({
  signIn: sinon.stub(),
  signUp: sinon.stub(),
  getMe: sinon.stub(),
  updateFilter: sinon.stub(),
  updateFilters: sinon.stub(),
  updateProfilePicture: sinon.stub(),
});

export const resolveAccountRepository = (): RestAccountRepositoryStub => {
  const accountRepository = stubAccountRepository();
  accountRepository.signIn.resolves(franck);
  accountRepository.signUp.resolves(franck);
  accountRepository.getMe.resolves(franck);
  accountRepository.updateFilter.resolves([]);
  accountRepository.updateFilters.resolves([]);
  accountRepository.updateProfilePicture.resolves(franck);
  return accountRepository;
};

export const rejectAccountRepository = (error: AxiosError): RestAccountRepositoryStub => {
  const accountRepository = stubAccountRepository();
  accountRepository.signUp.rejects(error);
  accountRepository.signIn.rejects(error);
  accountRepository.getMe.rejects(error);
  accountRepository.updateFilter.rejects(error);
  accountRepository.updateFilters.rejects(error);
  accountRepository.updateProfilePicture.rejects(error);

  return accountRepository;
};

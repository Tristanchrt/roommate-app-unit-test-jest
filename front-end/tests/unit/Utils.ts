import sinon, { SinonStub } from 'sinon';

import { AxiosError, AxiosInstance } from 'axios';
import VueRouter from 'vue-router';

export interface AxiosInstanceStub extends AxiosInstance {
  get: SinonStub;
  put: SinonStub;
  post: SinonStub;
  delete: SinonStub;
}

export const stubAxiosInstance = (): AxiosInstanceStub =>
  ({
    get: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    delete: sinon.stub(),
  } as any);

export interface LocalStorageStub extends Storage {
  getItem: SinonStub;
  setItem: SinonStub;
  removeItem: SinonStub;
}

export const stubLocalStorage = (): LocalStorageStub =>
  ({
    getItem: sinon.stub(),
    setItem: sinon.stub(),
    removeItem: sinon.stub(),
  } as any);

export const customError = (code: number, message: string): AxiosError =>
  ({
    message: message,
    response: {
      code: code,
      status: code,
      message: message,
      stack: `Error: ${message}`,
      data: { message: message },
    },
  } as any);

export const stubRouter = (params?: object): VueRouter => {
  const $router = new VueRouter(params);
  $router.push = jest.fn();
  $router.replace = jest.fn();
  ($router.push as jest.Mock).mockRejectedValue('error (this is used to test catch method from router push)');
  ($router.replace as jest.Mock).mockRejectedValue('error (this is used to test catch method from router replace)');
  return $router;
};

// @ts-ignore
export const flushPromises = () => new Promise(setImmediate);

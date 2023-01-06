import Vue, { VueConstructor } from 'vue';

import ModalController from '@/primary/utils/ModalController';

let modalController: ModalController = new ModalController();
let modalVue: VueConstructor = Vue.component('someComponent');

describe('Modal Controller', () => {
  beforeEach(() => {
    modalController = new ModalController();
    modalController.init(
      () => {},
      () => {}
    );
    modalVue = Vue.component('someComponent');
  });
  it("Should fail if modal controller isn't initializated", () => {
    modalController = new ModalController();
    try {
      modalController.close();
    } catch (e) {
      expect(e).toEqual(Error('Modal controller need to be initializated first'));
    }
    try {
      modalController.open({ component: modalVue });
    } catch (e) {
      expect(e).toEqual(Error('Modal controller need to be initializated first'));
    }
  });
  it('Should correctly be initializated', () => {
    const function1: Function = jest.fn();
    const function2: Function = jest.fn();
    const closingData: object = { someVar: 'someValue' };
    modalController.init(function1, function2);

    modalController.open({ component: modalVue, props: { someVar: 'someValue' } });
    modalController.close(closingData);

    expect(function1).toBeCalledTimes(1);
    expect(function1).toBeCalledWith({ component: modalVue, props: { someVar: 'someValue' } });
    expect(function2).toBeCalledTimes(1);
    expect(function2).toBeCalledWith(closingData);
  });
  it('Should correctly open modal', () => {
    modalController.open({ component: modalVue });

    expect(modalController.isOpened()).toBeTruthy();
  });
  it('Should correctly close modal', () => {
    modalController.open({ component: modalVue });
    expect(modalController.isOpened()).toBeTruthy();

    modalController.close();
    expect(modalController.isOpened()).toBeFalsy();
  });
  it('Should correctly call a function on open', () => {
    const someFunction = jest.fn();

    modalController.onOpen(someFunction);
    modalController.open({ component: modalVue, props: { someVar: 'someValue' } });
    modalController.close();

    expect(someFunction).toBeCalledWith({ component: modalVue, props: { someVar: 'someValue' } });
    expect(modalController.isOpened()).toBeFalsy();
  });
  it('Should correctly call a function on close', () => {
    const someFunction = jest.fn();
    const closingData: object = { someVar: 'someValue' };

    modalController.open({ component: modalVue });
    modalController.onClose(someFunction);
    modalController.close(closingData);

    expect(someFunction).toHaveBeenCalledTimes(1);
    expect(someFunction).toHaveBeenCalledWith(closingData);
    expect(modalController.isOpened()).toBeFalsy();
  });
});

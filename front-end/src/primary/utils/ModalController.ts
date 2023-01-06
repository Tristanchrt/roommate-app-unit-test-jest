import { VueConstructor } from 'vue';

export interface ModalOptions {
  component: VueConstructor;
  props?: Object;
}

export default class ModalController {
  private _isOpened: boolean = false;
  private closeFunction: Function | null = null;
  private openFunction: Function | null = null;
  private initOpenFunction: Function | null = null;
  private initCloseFunction: Function | null = null;

  open = (options: ModalOptions): void => {
    if (this.initOpenFunction == null || this.initCloseFunction == null) throw new Error('Modal controller need to be initializated first');

    this._isOpened = true;
    this.initOpenFunction!(options);
    if (this.openFunction != null) {
      this.openFunction(options);
      this.openFunction = null;
    }
  };

  close = (data?: any): void => {
    if (this.initOpenFunction == null || this.initCloseFunction == null) throw new Error('Modal controller need to be initializated first');

    this._isOpened = false;
    this.initCloseFunction!(data);
    if (this.closeFunction != null) {
      this.closeFunction(data);
      this.closeFunction = null;
    }
  };

  isOpened = (): boolean => {
    return this._isOpened;
  };

  onClose = (callback: Function): void => {
    this.closeFunction = callback;
  };

  onOpen = (callback: Function): void => {
    this.openFunction = callback;
  };

  init = (onOpen: Function, onClose: Function): void => {
    this.initOpenFunction = onOpen;
    this.initCloseFunction = onClose;
  };
}

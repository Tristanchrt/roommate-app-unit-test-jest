import sinon, { SinonStub } from 'sinon';

import ModalController from '@/primary/utils/ModalController';

interface ModalControllerStub extends ModalController {
  open: SinonStub;
  close: SinonStub;
  isOpened: SinonStub;
  onClose: SinonStub;
  onOpen: SinonStub;
  init: SinonStub;
}
export const resolveModalController = (): ModalControllerStub => {
  const modalController = new ModalController();
  modalController.init(
    () => {},
    () => {}
  );
  return modalController as ModalControllerStub;
};

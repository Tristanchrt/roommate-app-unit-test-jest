import { shallowMount, Wrapper } from '@vue/test-utils';

import { resolveModalController } from '../../../../../fixtures/ModalController.fixture';
import { flushPromises } from '../../../../../Utils';

import {
  CustomProfileFilterComponent,
  CustomProfileFilterVue,
} from '@/primary/components/filters/elements/customProfileFilterSelector/customProfileFilter';
import ModalController from '@/primary/utils/ModalController';

let wrapper: Wrapper<CustomProfileFilterComponent>;
let component: CustomProfileFilterComponent;

interface WrapParams {
  modalController?: ModalController;
  props?: {
    id?: string | undefined;
    icon?: string;
    text?: string;
    editable?: boolean | undefined;
  };
}
const wrap = (params?: WrapParams) => {
  const modalController = params?.modalController ? params?.modalController : resolveModalController();

  wrapper = shallowMount<CustomProfileFilterComponent>(CustomProfileFilterVue, {
    mocks: {},
    provide: {
      modalController: () => modalController,
    },
    propsData: {
      id: params?.props?.id ? params!.props!.id : undefined,
      icon: params?.props?.icon ? params!.props!.icon : '🔥',
      text: params?.props?.text ? params!.props!.text : 'Fire',
      editable: params?.props?.editable ? params!.props!.editable : undefined,
    },
  });
  component = wrapper.vm;
};

describe('Custom Profile Filter component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Should not open modal if component isn't editable", () => {
    const modalController: ModalController = resolveModalController();
    wrap({ modalController, props: { id: 'someModalId', icon: '🔥', text: 'Fire', editable: false } });

    const openModal = jest.spyOn(modalController, 'open');

    component.edit();
    expect(openModal).not.toHaveBeenCalled();
  });
  it('Should open modal if component is editable', () => {
    const modalController: ModalController = resolveModalController();
    wrap({ modalController, props: { id: 'someModalId', icon: '🔥', text: 'Fire', editable: true } });

    const openModal = jest.spyOn(modalController, 'open');
    const onClose = jest.spyOn(modalController, 'onClose');

    component.edit();
    expect(openModal).toBeCalled();
    expect(onClose).toBeCalled();
  });
  it('Should send update if user changed filters', async () => {
    const modalController: ModalController = resolveModalController();
    wrap({ modalController, props: { id: 'someModalId', icon: '🔥', text: 'Fire', editable: true } });

    component.edit();
    modalController.close({ text: 'Boom', icon: '🔥' });
    expect(wrapper.emitted('update')![0][0]).toStrictEqual({ id: 'someModalId', text: 'Boom', icon: '🔥' });

    component.edit();
    modalController.close({ text: 'Fire', icon: '🤣' });
    expect(wrapper.emitted('update')![1][0]).toStrictEqual({ id: 'someModalId', text: 'Fire', icon: '🤣' });
  });
  it("Should not update if user didn't change filter", async () => {
    const modalController: ModalController = resolveModalController();
    wrap({ modalController, props: { id: 'someModalId', icon: '🔥', text: 'Fire', editable: true } });

    component.edit();
    modalController.close();
    expect(wrapper.emitted('update')).toBe(undefined);

    component.edit();
    modalController.close({ text: 'Fire', icon: '🔥' });
    expect(wrapper.emitted('update')).toBe(undefined);
  });
  it('Should delete filter', async () => {
    const modalController: ModalController = resolveModalController();
    wrap({ modalController, props: { id: 'someModalId', icon: '🔥', text: 'Fire', editable: true } });
    component.deleteElement();

    await flushPromises();

    expect(wrapper.emitted('delete')?.length).toBe(1);
    expect(wrapper.emitted('delete')![0][0]).toBe('someModalId');
  });
});

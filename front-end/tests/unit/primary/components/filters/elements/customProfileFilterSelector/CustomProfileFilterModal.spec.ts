import { shallowMount, Wrapper } from '@vue/test-utils';

import { resolveModalController } from '../../../../../fixtures/ModalController.fixture';

import {
  CustomProfileFilterModalComponent,
  CustomProfileFilterModalVue,
} from '@/primary/components/filters/elements/customProfileFilterSelector/customProfileFilterModal';
import ModalController from '@/primary/utils/ModalController';

let wrapper: Wrapper<CustomProfileFilterModalComponent>;
let component: CustomProfileFilterModalComponent;

interface WrapParams {
  props?: {
    icon?: string;
    text?: string;
  };
  modalController?: ModalController;
}
const wrap = (params: WrapParams) => {
  const modalController = params?.modalController ? params!.modalController : resolveModalController();
  wrapper = shallowMount<CustomProfileFilterModalComponent>(CustomProfileFilterModalVue, {
    mocks: {},
    provide: {
      modalController: () => modalController,
    },
    propsData: {
      icon: params?.props?.icon ? params!.props!.icon : '🔥',
      text: params?.props?.text ? params!.props!.text : 'Fire',
    },
  });
  component = wrapper.vm;
};

describe('Custom Profile Filter Modal component', () => {
  it('Should exists', () => {
    wrap({ props: { icon: '🔥', text: 'Fire' } });

    expect(component.$options.components!.CustomProfileFilterVue).toBeDefined();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should set data from the component props', () => {
    wrap({ props: { icon: '🔥', text: 'Fire' } });
    expect(component.newIcon).toBe('🔥');
    expect(component.newInput).toBe('Fire');
  });
  it('Should cancel changes on close', () => {
    const modalController = resolveModalController();
    wrap({ props: { icon: '🔥', text: 'Fire' }, modalController });

    component.newIcon = '🤣';
    component.newInput = 'someNewFire';

    modalController.onClose((data: Object) => {
      expect(data).not.toBeDefined();
    });

    component.close();
  });
  it('Should save changes on save', () => {
    const modalController = resolveModalController();
    wrap({ props: { icon: '🔥', text: 'Fire' }, modalController });

    component.newIcon = '🤣';
    component.newInput = 'someNewFire w/ long txt that must be shrinked at pos 20';

    modalController.onClose((data: Object) => {
      expect(data).toEqual({ icon: '🤣', text: 'someNewFire w/ long' });
    });

    component.save();
  });
  it('Should change icon on click', () => {
    wrap({ props: { icon: '🔥', text: 'Fire' } });
    component.selectIcon('🤣');
    expect(component.newIcon).toBe('🤣');
  });
  it('Should correctly scroll to Top', async () => {
    wrap({ props: { icon: '🔥', text: 'Fire' } });
    const conversationContainer = component.$el.querySelector('.modal > .container');
    conversationContainer!.scrollTop = 100;
    expect(conversationContainer!.scrollTop).toBe(100);

    await component.$nextTick();

    component.scrollTop();
    expect(conversationContainer!.scrollTop).toBe(0);
  });
});

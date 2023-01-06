import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { resolveRoutesController, stubRoutesController } from '../../../../../fixtures/RoutesController.fixture';
import { stubStoreRepository } from '../../../../../fixtures/store/StoreRepository.fixture';
import { stubRouter } from '../../../../../Utils';

import { TypeFilter } from '@/domain/account/filter/Filter';
import { StoreRepository } from '@/domain/store/StoreRepository';
import { SliderFilterComponent, SliderFilterVue } from '@/primary/components/filters/elements/slider';
import RoutesController from '@/primary/utils/RoutesController';

let wrapper: Wrapper<SliderFilterComponent>;
let component: SliderFilterComponent;

let $router: VueRouter = stubRouter();
interface WrapParams {
  title?: string;
  step?: number;
  range?: {
    min: number;
    max: number;
  };
  initialValue?: Array<number>;
}

const wrap = (params?: WrapParams) => {
  wrapper = shallowMount<SliderFilterComponent>(SliderFilterVue, {
    mocks: {
      $router,
    },
    propsData: {
      title: params?.title ? params!.title : 'someTitle',
      step: params?.step ? params!.step : 2,
      range: params?.range ? params!.range : { min: 0, max: 100 },
      initialValue: params?.initialValue ? params!.initialValue : undefined,
    },
  });
  component = wrapper.vm;
};

describe('Slider Filter Component', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly init values', () => {
    wrap({ range: { min: 0, max: 100 } });
    expect(component.values).toEqual([0, 100]);

    wrap({ range: { min: 0, max: 100 }, initialValue: [0, 20, 30] });
    expect(component.values).toEqual([0, 20, 30]);
  });
  it('Should correcty watch for changes', async () => {
    wrap();

    component.checkForChanges = jest.fn();
    await component.$nextTick();
    component.values = [0, 20];
    await component.$nextTick();

    expect(component.checkForChanges).toHaveBeenCalledTimes(1);
  });
  it('Should emit changes when value has been changed for some time', async () => {
    wrap();

    const initialClearTimeoutCalls = 1;
    const _clearTimeout = jest.spyOn(window, 'clearTimeout');

    component.checkForChanges();

    expect(component.timeout).not.toBeNull();
    expect(_clearTimeout).toBeCalledTimes(initialClearTimeoutCalls + 0);

    jest.advanceTimersByTime(500);
    component.checkForChanges();

    expect(_clearTimeout).toBeCalledTimes(initialClearTimeoutCalls + 1);
    expect(wrapper.emitted('change')).toBeUndefined();

    jest.advanceTimersByTime(1000);

    expect(wrapper.emitted('change')?.length).toBe(1);
    expect(wrapper.emitted('change')![0][0]).toEqual({ type: TypeFilter.SliderFilter, value: component.values });
    expect(component.timeout).toBeNull();
  });
});

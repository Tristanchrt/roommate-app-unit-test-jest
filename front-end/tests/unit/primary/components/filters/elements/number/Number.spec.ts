import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter, { Route } from 'vue-router';

import { TypeFilter } from '@/domain/account/filter/Filter';
import { NumberFilterComponent, NumberFilterVue } from '@/primary/components/filters/elements/number';

let wrapper: Wrapper<NumberFilterComponent>;
let component: NumberFilterComponent;

interface WrapParams {
  title?: string;
  content?: string;
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
}

const wrap = (params?: WrapParams) => {
  wrapper = shallowMount<NumberFilterComponent>(NumberFilterVue, {
    propsData: {
      title: params?.title ? params!.title : 'someTitle',
      content: params?.content ? params!.content : 'someContent',
      min: params?.min ? params!.min : 0,
      max: params?.max ? params!.max : 50,
      step: params?.step ? params!.step : 2,
      initialValue: params?.initialValue ? params!.initialValue : undefined,
    },
  });
  component = wrapper.vm;
};

describe('Number Filter Component', () => {
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly init value', () => {
    wrap({ initialValue: 20 });
    expect(component.value).toEqual(20);

    wrap({ min: 10 });
    expect(component.value).toEqual(10);
  });
  it('Should correctly set value to max if value exceed it', async () => {
    wrap({ min: 10, max: 50 });
    component.$emit = jest.fn();
    component.value = 100000;
    await component.$nextTick();

    expect(component.value).toBe(component.max);
  });
  it('Should correctly set value to min if value is bellow it or null', async () => {
    wrap({ min: 10, max: 50 });
    component.$emit = jest.fn();
    component.value = 5;
    await component.$nextTick();

    expect(component.value).toBe(component.min);

    component.value = null;
    await component.$nextTick();

    expect(component.value).toBe(10);
  });
  it('Should emit changes when value has been changed for some time', async () => {
    wrap({ initialValue: 20, min: 10, max: 50 });

    component.$emit = jest.fn();
    const initialClearTimeoutCalls = 4;
    const _clearTimeout = jest.spyOn(window, 'clearTimeout');

    expect(component.timeout).toBeNull();
    expect(_clearTimeout).toBeCalledTimes(initialClearTimeoutCalls + 0);

    jest.advanceTimersByTime(200);
    component.value = 15;
    await component.$nextTick();

    expect(_clearTimeout).toBeCalledTimes(initialClearTimeoutCalls + 0);
    expect(component.$emit).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(400);
    component.value = 30;
    await component.$nextTick();

    expect(_clearTimeout).toBeCalledTimes(initialClearTimeoutCalls + 1);
    expect(component.$emit).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(600);

    expect(component.$emit).toHaveBeenCalledTimes(1);
    expect(component.$emit).toBeCalledWith('change', { type: TypeFilter.NumberFilter, value: component.value });
    expect(component.timeout).toBeNull();
  });
});

import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { resolveRoutesController, stubRoutesController } from '../../../../../fixtures/RoutesController.fixture';
import { stubStoreRepository } from '../../../../../fixtures/store/StoreRepository.fixture';
import { stubRouter } from '../../../../../Utils';

import { TypeFilter } from '@/domain/account/filter/Filter';
import { SelectFilterComponent, SelectFilterVue } from '@/primary/components/filters/elements/select';

let wrapper: Wrapper<SelectFilterComponent>;
let component: SelectFilterComponent;

let $router: VueRouter = stubRouter();
interface WrapParams {
  title?: string;
  options?: Array<string>;
  multiple?: boolean;
  initialValue?: Array<string>;
}

const wrap = (params?: WrapParams) => {
  wrapper = shallowMount<SelectFilterComponent>(SelectFilterVue, {
    mocks: {
      $router,
    },
    propsData: {
      title: params?.title ? params!.title : 'someTitle',
      options: params?.options ? params!.options : ['LYON1', 'LYON2', 'LYON3'],
      multiple: params?.multiple != undefined ? params!.multiple : true,
      initialValue: params?.initialValue ? params!.initialValue : undefined,
    },
  });
  component = wrapper.vm;
};

describe('Select Filter Component', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly init values', () => {
    wrap({ options: ['LYON1', 'LYON2', 'LYON3'] });
    expect(component.values).toEqual([]);

    wrap({ options: ['LYON1', 'LYON2', 'LYON3'], initialValue: ['LYON1', 'LYON3'] });
    expect(component.values).toEqual(['LYON1', 'LYON3']);
  });
  it('Should correcty watch for changes', async () => {
    wrap();

    component.$emit = jest.fn();
    await component.$nextTick();
    component.values = ['LYON1'];
    await component.$nextTick();

    expect(component.$emit).toBeCalledTimes(1);
    expect(component.$emit).toBeCalledWith('change', { type: TypeFilter.SelectFilter, value: component.values });
  });
  it('Should not add multiple times the same value', () => {
    wrap({ initialValue: ['LYON1', 'LYON2'] });
    const event = { target: { value: 'LYON1' } };
    component.singleController = jest.fn();

    component.onChange(event);

    expect(event.target.value).toBe('');
    expect(component.singleController).toBeCalledTimes(1);
  });
  it('Should correctly set value(s) on change', () => {
    wrap({ initialValue: ['LYON1', 'LYON2'] });
    component.singleController = jest.fn();
    const event = { target: { value: 'LYON15' } };

    component.onChange(event);

    expect(component.values).toEqual(['LYON1', 'LYON2', 'LYON15']);
    expect(component.singleController).toBeCalledTimes(1);
    expect(event.target.value).toBe('');
  });
  it('Should correctly remove a selection', () => {
    wrap({ initialValue: ['LYON1', 'LYON2', 'LYON15'] });
    component.singleController = jest.fn();

    component.remove('LYON1');
    expect(component.values).toStrictEqual(['LYON2', 'LYON15']);
    expect(component.singleController).toBeCalledTimes(1);
  });
  it("Should correctly slice out values if it's a single selection component", () => {
    wrap({ multiple: false, initialValue: ['LYON1', 'LYON2'] });

    component.singleController();

    expect(component.values).toStrictEqual(['LYON2']);
  });
});

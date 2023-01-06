import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { stubRouter } from '../../../../../Utils';

import { TypeFilter } from '@/domain/account/filter/Filter';
import { ElementSelectorComponent, ElementSelectorVue } from '@/primary/components/filters/elements/elementSelector';

let wrapper: Wrapper<ElementSelectorComponent>;
let component: ElementSelectorComponent;

let $router: VueRouter = stubRouter();
interface WrapParams {
  title?: string;
  options?: Array<{ image: string; value: string }>;
  multiple?: boolean;
  initialValue?: Array<string>;
}

const wrap = (params?: WrapParams) => {
  wrapper = shallowMount<ElementSelectorComponent>(ElementSelectorVue, {
    mocks: {
      $router,
    },
    propsData: {
      title: params?.title ? params!.title : 'someTitle',
      options: params?.options
        ? params!.options
        : [
            { image: 'france.png', value: 'france' },
            { image: 'espagne.png', value: 'espagne' },
          ],
      multiple: params?.multiple != undefined ? params!.multiple : true,
      initialValue: params?.initialValue ? params!.initialValue : undefined,
    },
  });
  component = wrapper.vm;
};

describe('Element Selector Filter Component', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly init values', () => {
    wrap({ initialValue: ['someElement1', 'someElement2'] });
    expect(component.values).toEqual(['someElement1', 'someElement2']);

    wrap({});
    expect(component.values).toEqual([]);
  });
  it('Should correctly watch for changes', async () => {
    wrap({});

    component.$emit = jest.fn();
    await component.$nextTick();
    component.values = ['someElement1', 'someElement2'];
    await component.$nextTick();
    expect(component.$emit).toHaveBeenCalledTimes(1);
    expect(component.$emit).toBeCalledWith('change', { type: TypeFilter.SelectFilter, value: component.values });
  });
  it('Should verify if a value is selected', () => {
    wrap({ initialValue: ['someElement1', 'someElement2'] });

    const isSelectedVal: boolean = component.isSelected('someElement1');
    expect(isSelectedVal).toBeTruthy();

    const _isSelectedVal: boolean = component.isSelected('notInValues');
    expect(_isSelectedVal).toBeFalsy();
  });
  it('Should toggle values selected', () => {
    wrap({ initialValue: ['someElement1', 'someElement2'], multiple: true });
    component.singleController = jest.fn();

    component.isSelected = jest.fn().mockReturnValue(false);
    component.toggleSelect('someElement3');
    expect(component.values).toEqual(['someElement1', 'someElement2', 'someElement3']);
    expect(component.singleController).toBeCalledTimes(1);

    component.isSelected = jest.fn().mockReturnValue(true);
    component.toggleSelect('someElement2');
    expect(component.values).toEqual(['someElement1', 'someElement3']);
    expect(component.singleController).toBeCalledTimes(2);
  });
  it("Should correctly slice out values if it's a single selection component", () => {
    wrap({ multiple: false, initialValue: ['someElement1', 'someElement3'] });
    component.singleController();
    expect(component.values).toStrictEqual(['someElement3']);

    wrap({ multiple: true, initialValue: ['someElement1', 'someElement3'] });
    component.singleController();
    expect(component.values).toStrictEqual(['someElement1', 'someElement3']);
  });
});

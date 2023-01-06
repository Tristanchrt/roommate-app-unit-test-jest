import { shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { stubRouter } from '../../../../../Utils';

import { TypeFilter } from '@/domain/account/filter/Filter';
import { ImageSelectorComponent, ImageSelectorVue } from '@/primary/components/filters/elements/imageSelector';

let wrapper: Wrapper<ImageSelectorComponent>;
let component: ImageSelectorComponent;

let $router: VueRouter = stubRouter();
interface WrapParams {
  title?: string;
  options?: Array<{ image: string; value: string }>;
  multiple?: boolean;
  initialValue?: Array<string>;
}

const wrap = (params?: WrapParams) => {
  wrapper = shallowMount<ImageSelectorComponent>(ImageSelectorVue, {
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

describe('Image Selector Filter Component', () => {
  beforeEach(() => {
    $router = stubRouter();
  });
  it('Should exists', () => {
    wrap();
    expect(wrapper.exists()).toBeTruthy();
  });
  it('Should correctly init values', () => {
    wrap({
      options: [
        { image: 'france.png', value: 'france' },
        { image: 'espagne.png', value: 'espagne' },
      ],
    });
    expect(component.values).toEqual([]);

    wrap({
      options: [
        { image: 'france.png', value: 'france' },
        { image: 'espagne.png', value: 'espagne' },
        { image: 'italie.png', value: 'italie' },
      ],
      initialValue: ['france', 'espagne', 'italie'],
    });
    expect(component.values).toEqual(['france', 'espagne', 'italie']);
  });
  it('Should correcty watch for changes', async () => {
    wrap();

    component.$emit = jest.fn();
    await component.$nextTick();
    component.values = ['japon'];
    await component.$nextTick();

    expect(component.$emit).toBeCalledTimes(1);
    expect(component.$emit).toBeCalledWith('change', { type: TypeFilter.ImageFilter, value: component.values });
  });
  it('Should remove image if already selected', () => {
    wrap({ initialValue: ['france', 'espagne'] });
    component.singleController = jest.fn();

    component.toggleImage('france');
    expect(component.values).toStrictEqual(['espagne']);
    expect(component.singleController).toBeCalledTimes(1);
  });
  it('Should correctly add value if not already selected', () => {
    wrap({ initialValue: ['france', 'espagne'] });
    component.singleController = jest.fn();

    component.toggleImage('japon');

    expect(component.values).toEqual(['france', 'espagne', 'japon']);
    expect(component.singleController).toBeCalledTimes(1);
  });

  it("Should correctly slice out values if it's a single selection component", () => {
    wrap({ multiple: false, initialValue: ['france', 'espagne'] });
    component.singleController();
    expect(component.values).toStrictEqual(['espagne']);

    wrap({ multiple: true, initialValue: ['france', 'espagne'] });
    component.singleController();
    expect(component.values).toStrictEqual(['france', 'espagne']);
  });
});

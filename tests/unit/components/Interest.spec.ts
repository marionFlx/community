import { mount } from '@vue/test-utils';
import { InterestModel } from '@/models/InterestModel';
import Interest from '@/components/Interest.vue';
import { InterestTypeEnum } from '@/enums/InterestTypeEnum';

function interestWrapper(interestModel: InterestModel) {
  return mount(Interest, {
    props: {
      interestModel
    }
  });
}

describe('Interest.vue', () => {
  test('should display an image and a legend', () => {
    const interestModel: InterestModel = {
      id: 1,
      label: 'Netflix',
      type: InterestTypeEnum.MOVIE
    };

    const wrapper = interestWrapper(interestModel);

    const url = wrapper.vm.interestImageUrl;

    // The URL built with `interestImageUrl` is not correct
    expect(url).toBe('/images/icon-movie.svg');

    // You should have an image for the interest
    const image = wrapper.get('img');
    // The `src` attribute of the image is not correct
    expect(image.attributes('src')).toBe('/images/icon-movie.svg');
    // The `alt` attribute for the image is not correct
    expect(image.attributes('alt')).toBe('Netflix');
    // You should have a `figcaption` element for the interest
    const legend = wrapper.get('figcaption');
    // The `figcaption` element should display the interest's name
    expect(legend.text()).toContain('Netflix');
  });

  test('should emit an event on click', () => {
    const interestModel: InterestModel = {
      id: 1,
      label: 'Netflix',
      type: InterestTypeEnum.MOVIE
    };

    const wrapper = interestWrapper(interestModel);

    // You should have a `figure` element for the interest
    const figure = wrapper.get('figure');
    figure.trigger('click');
    // You may have forgot the click handler on the `figure` element
    // or to emit the `interestSelected` event in the click handler
    expect(wrapper.emitted().interestSelected).toBeTruthy();
  });
});

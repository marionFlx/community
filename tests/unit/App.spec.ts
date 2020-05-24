import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';

describe('App.vue', () => {
  test('renders a title', () => {
    const wrapper = mount(App);
    expect(wrapper.get('h1').text()).toBe('Maplr Community');
  });

  test('renders the navbar', () => {
    const wrapper = mount(App);
    const navbar = wrapper.findComponent(Navbar);
    expect(navbar.exists()).toBeTruthy();
  });

  test('renders the members list inside a Suspense component', async () => {
    const result = 'Hello';
    const wrapper = mount(App, {
      global: {
        stubs: {
          Members: defineComponent({
            template: '<div>{{ result }}</div>',
            async setup() {
              return { result };
            }
          })
        }
      }
    });
    expect(wrapper.html()).toContain('Loading...');

    await nextTick();
    await nextTick();

    expect(wrapper.html()).toContain('Hello');
  });

  test('renders the members list inside a Suspense component', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          Members: defineComponent({
            template: '<div>{{ result }}</div>',
            async setup() {
              return { result: 'Hello' };
            }
          })
        }
      }
    });
    expect(wrapper.html()).toContain('Loading...');

    await nextTick();
    await nextTick();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Hello');
  });

  test('renders an error if members list does not load', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          Members: defineComponent({
            template: '<div>Error</div>',
            async setup() {
              await Promise.reject();
            }
          })
        }
      }
    });
    expect(wrapper.html()).toContain('Loading...');

    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('An error occurred while loading.');
  });
});

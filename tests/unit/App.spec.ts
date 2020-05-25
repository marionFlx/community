import { mount, RouterLinkStub } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import { createRouter, createWebHistory } from 'vue-router';

const mockRouter = createRouter({ history: createWebHistory(), routes: [] });

describe('App.vue', () => {
  test('renders the navbar', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [mockRouter],
        stubs: {
          RouterView: true,
          RouterLink: true
        }
      }
    });
    const navbar = wrapper.findComponent(Navbar);
    expect(navbar.exists()).toBeTruthy();
  });

  test('renders the router view inside a Suspense component', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [mockRouter],
        stubs: {
          RouterView: defineComponent({
            template: '<div>{{ result }}</div>',
            async setup() {
              return { result: 'Hello' };
            }
          }),
          RouterLink: RouterLinkStub
        }
      }
    });
    expect(wrapper.html()).toContain('Loading...');

    await nextTick();
    await nextTick();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Hello');
  });

  test('renders an error if router view does not load', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [mockRouter],
        stubs: {
          RouterView: defineComponent({
            template: '<div>Error</div>',
            async setup() {
              await Promise.reject();
            }
          }),
          RouterLink: RouterLinkStub
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

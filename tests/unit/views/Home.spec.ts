import { mount, RouterLinkStub } from '@vue/test-utils';
import Home from '@/views/Home.vue';

function homeWrapper() {
  return mount(Home, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      }
    }
  });
}

describe('Home.vue', () => {
  test('should display every member name in a title', () => {
    const wrapper = homeWrapper();

    // You should have an `h1` element to display the title
    const title = wrapper.get('h1');
    expect(title.text()).toContain('Maplr Community');
  });

  test('display a link to go the members', () => {
    const wrapper = homeWrapper();

    // You should have an `a` element to display the link to the members
    const link = wrapper.findComponent(RouterLinkStub);
    // The link should have a text
    expect(link.text()).toContain('members');
    expect(link.props().to).toBe('/members');
  });

  test('display a link to go the register page', () => {
    const wrapper = homeWrapper();

    const link = wrapper.findAllComponents(RouterLinkStub)[1];
    // You should have an `a` element to display the link to the register page
    expect(link.exists()).toBeTruthy();
    // The link should have a text
    expect(link.text()).toBe('Register');
    // The URL of the link is not correct. Maybe you forgot to use `<RouterLink to="/register">`?
    expect(link.props().to).toBe('/register');
  });
});

import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Members from '@/views/Members.vue';

describe('App.vue', () => {
  test('renders a title', () => {
    const wrapper = mount(App);
    expect(wrapper.get('h1').text()).toBe('Maplr Community');
  });

  test('renders the navbar', () => {
    const wrapper = mount(App);
    const navbar = wrapper.findComponent(Navbar);
    // Maybe you forgot to add <Navbar/> in your App.vue component
    expect(navbar.exists()).toBeTruthy();
  });

  test('renders the members list', () => {
    const wrapper = mount(App);
    const members = wrapper.findComponent(Members);
    // Maybe you forgot to add <Members/> in your App.vue component
    expect(members.exists()).toBeTruthy();
  });
});

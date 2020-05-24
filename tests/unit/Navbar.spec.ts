import { mount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';

describe('Navbar.vue', () => {
  test('should toggle the class on click', async () => {
    const wrapper = mount(Navbar);
    const navbarCollapsed = wrapper.get('#navbar').element!;
    // The element with the id `#navbar` should have the class `collapse`
    expect(navbarCollapsed.className).toContain('navbar-collapse collapse');

    // We should have a `button` element to collapse the menu
    const button = wrapper.get('button');
    await button.trigger('click');

    const navbar = wrapper.get('#navbar').element!;
    // The element with the id `#navbar` should have not the class `collapse` after a click
    expect(navbar.className).toContain('navbar-collapse');
    expect(navbar.className).not.toContain('navbar-collapse collapse');
  });
});

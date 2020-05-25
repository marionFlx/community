import { mount, RouterLinkStub } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';

function navbarWrapper() {
  return mount(Navbar, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      }
    }
  });
}

describe('Navbar.vue', () => {
  test('should have a `navbarCollapsed` field', () => {
    const navbar = navbarWrapper().vm;
    // Check that `navbarCollapsed` is initialized with `true`.
    // Maybe you forgot to declare `navbarCollapsed` in your component.
    expect(navbar.navbarCollapsed).toBe(true);
  });

  test('should have a `toggleNavbar` function', () => {
    const navbar = navbarWrapper().vm;
    // Maybe you forgot to declare a `toggleNavbar()` function.
    expect(navbar.toggleNavbar).not.toBeNull();
    navbar.toggleNavbar();

    // `toggleNavbar()` should change `navbarCollapsed` from true to false`
    expect(navbar.navbarCollapsed).toBe(false);

    navbar.toggleNavbar();

    // `toggleNavbar()` should change `navbarCollapsed` from false to true`
    expect(navbar.navbarCollapsed).toBe(true);
  });

  test('should toggle the class on click', async () => {
    const wrapper = navbarWrapper();
    const navbarCollapsed = wrapper.get('#navbar').element;
    // The element with the id `#navbar` should have the class `collapse`
    expect(navbarCollapsed.className).toContain('navbar-collapse collapse');

    // We should have a `button` element to collapse the menu
    const button = wrapper.get('button');
    await button.trigger('click');

    const navbar = wrapper.get('#navbar').element;
    // The element with the id `#navbar` should have not the class `collapse` after a click
    expect(navbar.className).toContain('navbar-collapse');
    expect(navbar.className).not.toContain('navbar-collapse collapse');
  });

  test('should display a link to the home page', () => {
    const wrapper = navbarWrapper();
    // The navbar brand should link to the home page
    const navbarBrand = wrapper.getComponent(RouterLinkStub);
    expect(navbarBrand.text()).toBe('Maplr Community');
    expect(navbarBrand.props().to).toBe('/');
  });

  test('should display a link to the members page', () => {
    const wrapper = navbarWrapper();
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links).toHaveLength(2);
    const membersLink = links[1];
    // The members link should link to the members page
    expect(membersLink.exists()).toBeTruthy();
    expect(membersLink.text()).toBe('Members');
    expect(membersLink.props().to).toBe('/members');
  });
});

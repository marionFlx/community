// https://docs.cypress.io/api/introduction/api.html

describe('Maplr Community', () => {
  it('should display title on home page', () => {
    cy.visit('/');
    cy.contains('h1', 'Maplr Community');
    cy.get('.btn-primary').contains('Go to members').should('have.attr', 'href', '/members');
  });

  const navbarBrand = '.navbar-brand';
  const navbarLink = '.nav-link';

  it('should display a navbar', () => {
    cy.visit('/');
    cy.get(navbarBrand).contains('Maplr Community').should('have.attr', 'href', '/');
    cy.get(navbarLink).contains('Members').should('have.attr', 'href', '/members');
  });

  it('should display a navbar collapsed on small screen', () => {
    cy.viewport('iphone-6+');
    cy.visit('/');
    cy.contains(navbarBrand, 'Maplr Community');
    cy.get(navbarLink).should('not.be.visible');

    // toggle the navbar
    cy.get('.navbar-toggler').click();
    cy.get(navbarLink).should('be.visible');
  });

  test('display a link to go the members', () => {
    const wrapper = homeWrapper();

    // You should have an `a` element to display the link to the races
    const link = wrapper.findComponent(RouterLinkStub);
    // The link should have a text
    expect(link.text()).toContain('members');
    // The URL of the link is not correct. Maybe you forgot to use `<RouterLink to="/members">`?
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

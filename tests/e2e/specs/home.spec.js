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
});

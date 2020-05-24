// https://docs.cypress.io/api/introduction/api.html

describe('Maplr Community', () => {
  it('should display title on home page', () => {
    cy.visit('/');
    cy.contains('h1', 'Maplr Community');
  });

  const navbarBrand = '.navbar-brand';
  const navbarLink = '.nav-link';

  it('should display a navbar', () => {
    cy.visit('/');
    cy.contains(navbarBrand, 'Maplr Community');
    cy.contains(navbarLink, 'Maplrs');
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

  it('should display a member list', () => {
    cy.visit('/');
    cy.get('h2').should('have.length', 4);
    cy.get('p').should('have.length', 4).and('contain', 'ago');
    cy.get('.container ul li').should('have.length', 12);
  });
});

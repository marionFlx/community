// https://docs.cypress.io/api/introduction/api.html
const member = {
  id: 1,
  name: 'Julien',
  signupDate: '2019-02-18T08:02:00Z',
  interests: [
    { id: 1, label: 'Gym', type: 'Activity' },
    { id: 2, label: 'Triton', type: 'Job' },
    { id: 3, label: 'Netflix', type: 'Movie' }
  ]
};

function startBackend() {
  cy.server({ force404: true });
  cy.route({
    method: 'GET',
    url: '/members?status=ACTIVE',
    response: [
      member,
      {
        id: 2,
        name: 'Pierre',
        signupDate: '2020-02-18T08:02:00Z',
        interests: [
          { id: 4, label: 'Toulouse', type: 'Travel' },
          { id: 5, label: 'Ubisoft', type: 'Job' },
          { id: 6, label: 'Poker', type: 'Activity' }
        ]
      }
    ]
  }).as('getMembers');
}

describe('Maplr Community', () => {
  beforeEach(() => startBackend());

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
    // loading
    cy.contains('div', 'Loading...');
    cy.wait('@getMembers');
    cy.get('h2').should('have.length', 2);
  });

  it('should display a loading error', () => {
    // overriding the response to have an error
    cy.route({
      method: 'GET',
      url: '/members?status=ACTIVE',
      status: 404,
      response: []
    }).as('getMembersError');
    cy.visit('/');
    // loading
    cy.contains('div', 'Loading...');
    cy.wait('@getMembersError');
    cy.contains('div.alert', 'An error occurred while loading.');
  });

  it('should display interests', () => {
    cy.visit('/');
    cy.wait('@getMembers');
    cy.get('figure').should('have.length', 6);
    cy.get('img').should('have.length', 6);
    cy.get('figcaption').should('have.length', 6);
  });
});

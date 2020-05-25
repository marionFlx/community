// https://docs.cypress.io/api/introduction/api.html

const user = {
  id: 1,
  email: 'marion@maplr.co',
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
};

function startBackend() {
  cy.server({ force404: true });

  cy.route({
    method: 'POST',
    url: '/users',
    response: [user]
  }).as('registerUser');
}

describe('Register', () => {
  beforeEach(() => startBackend());

  it('should display a register page', () => {
    cy.visit('/register');

    const EmailInput = () => cy.get('input').first();
    const passwordInput = () => cy.get('input[type=password]').first();
    const errorMessage = () => cy.get('.invalid-feedback');

    cy.get('button').should('be.visible').and('be.disabled');
    EmailInput().type('c');
    EmailInput().clear();
    errorMessage().should('be.visible').and('contain', 'Email is required');
    EmailInput().type('ced');
    errorMessage().should('not.be.visible');

    passwordInput().type('p');
    passwordInput().clear();
    errorMessage().should('be.visible').and('contain', 'The password is required');
    passwordInput().type('pa');
    errorMessage().should('not.be.visible');

    cy.get('form > button').click();
    cy.wait('@registerUser');

    cy.url().should('be', '/');
  });
});

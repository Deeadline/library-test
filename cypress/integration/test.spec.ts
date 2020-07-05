describe('Home Page', () => {
  before(() => {
    cy.visit('/');
  });
  it('check the title', () => {
    cy.contains('Resources');
  });
});

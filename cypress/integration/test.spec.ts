describe('Home Page', () => {
  before(() => {
    cy.visit('/');
  });
  test('check the title', () => {
    cy.contains('Resources');
  });
});

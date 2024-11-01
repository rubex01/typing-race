describe('Starting page', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Text is visible', () => {
    cy.visit('/')
    cy.contains('h1', 'Your').should('be.visible')
    cy.contains('h1', 'Player Tag').should('be.visible')
  })

  it('checks the input field is visible and editable', () => {
    cy.get('.custom-input').should('be.visible')
    cy.get('.custom-input').should('have.class', 'custom-input')

    cy.get('.custom-input').type('Player123')
    cy.should('have.value', 'Player123')
  })

  it('submits a player tag and navigates to the game page', () => {
    cy.get('.custom-input').type('Player123 {enter}')

    cy.contains('h1', 'Your').should('not.exist')
    cy.contains('h1', 'Player Tag').should('not.exist')
  })

  it('displays an error message if the player tag is empty', () => {
    cy.get('.custom-input').clear().type('{enter}')
    cy.contains('h1', 'Your').should('be.visible')
    cy.contains('h1', 'Player Tag').should('be.visible')
  })
})

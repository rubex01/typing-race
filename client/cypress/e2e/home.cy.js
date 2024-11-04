describe('Starting page', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('checks the input field is visible and editable', () => {
    cy.get('.player-creation-input').should('be.visible')
    cy.get('.player-creation-input').should('have.class', 'custom-input')

    cy.get('.player-creation-input').type('Player123')
    cy.should('have.value', 'Player123')
  })

  it('submits a player tag and navigates to the game page', () => {
    cy.get('.player-creation-input').type('Player123 {enter}')
    cy.get('.player-creation-input').should('not.exist')
  })

  it('displays an error message if the player tag is empty', () => {
    cy.get('.player-creation-input').clear()
    cy.get('.player-creation-input').type('{enter}')
    cy.get('.player-creation-input').should('be.visible')
  })
})

describe('join page', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('.custom-input')
      .type('Player123{enter}')
  })

  it('join game is visible', () => {
    cy.get('input').should('be.visible');
    cy.contains('button', 'join').should('be.visible');
  })

  it('Start game is visible', () => {
    cy.contains('button', 'Start your own game').should('be.visible');
  })

  it('Can join game by enter', () => {
    cy.get('input').type('myid{enter}')
    cy.contains('button', 'Start your own game').should('not.exist');
    cy.contains('h1', 'Waiting for other players').should('be.visible')
  })

  it('Can join game by click', () => {
    cy.get('input').type('myid')
    cy.contains('button', 'join').click();
    cy.contains('button', 'join').should('not.exist');
    cy.contains('h1', 'Waiting for other players').should('be.visible')
  })

  it('Can not join empty game id', () => {
    cy.get('input').type('{enter}')
    cy.contains('button', 'join').should('be.visible');
    cy.contains('h1', 'Waiting for other players').should('not.exist')
  })

  it('Can create game', () => {
    cy.contains('button', 'Start your own game').click();
    cy.contains('button', 'Start your own game').should('not.exist');
    cy.contains('h1', 'Waiting for other players').should('be.visible')
  })
})

describe('join page', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('.custom-input')
      .type('Player123{enter}')
  })

  it('join game is visible', () => {
    cy.get('input').should('be.visible');
    cy.contains('button', 'Join').should('be.visible');
  })

  it('Start game is visible', () => {
    cy.contains('button', 'Start your own game').should('be.visible');
  })

  it('Can join game by enter', () => {
    cy.get('input').type('myid{enter}')
    cy.contains('button', 'Start your own game').should('not.exist');
    cy.contains('h1', 'Waiting for').should('be.visible')
    cy.contains('h1', 'other players').should('be.visible')
    cy.contains('h1', 'to join').should('be.visible')
  })

  it('Can join game by click', () => {
    cy.get('input').type('myid')
    cy.contains('button', 'Join').click();
    cy.contains('button', 'Join').should('not.exist');
    cy.contains('h1', 'Waiting for').should('be.visible')
    cy.contains('h1', 'other players').should('be.visible')
    cy.contains('h1', 'to join').should('be.visible')
  })

  it('Can not join empty game id', () => {
    cy.get('input').type('{enter}')
    cy.contains('button', 'Join').should('be.visible');
    cy.contains('h1', 'Waiting for').should('not.exist')
    cy.contains('h1', 'other players').should('not.exist')
    cy.contains('h1', 'to join').should('not.exist')
  })

  it('Can create game', () => {
    cy.contains('button', 'Start your own game').click();
    cy.contains('button', 'Start your own game').should('not.exist');
    cy.contains('h1', 'Waiting for').should('be.visible')
    cy.contains('h1', 'other players').should('be.visible')
    cy.contains('h1', 'to join').should('be.visible')
  })
})

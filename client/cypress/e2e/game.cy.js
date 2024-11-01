import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

describe('game page', () => {
  beforeEach(() => {
    const socket = io('http://socketio:3000')
    const gameId = uuidv4();
    socket.emit('join', gameId, {playerId: uuidv4()})

    cy.visit('/');
    cy.get('.custom-input')
      .type('Player123{enter}')

    cy.get('input').type(gameId)
    cy.contains('button', 'join').click()

    cy.get('.game-page').should('exist');
  })

  it('Game can be played and won', () => {
    cy.get('.typing-display')
      .find('div')
      .each(($word, index) => {
        if (index === 21) return;
        const wordText = $word.text();
        cy.log(`Typing word: ${wordText}`);
        cy.get('input').type(wordText + ' ');
      });

    cy.contains('h1', 'You Won').should('be.visible')
  });

  it('Game is leavable', () => {
    cy.contains('button', 'Leave').click();
    cy.contains('button', 'Leave').should('not.exist')
  });
})

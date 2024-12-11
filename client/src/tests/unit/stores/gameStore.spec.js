import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game.js'
import {socket} from '@/services/socket.js'
import { usePlayerStore } from '@/stores/player.js'

vi.mock('@/services/socket.js')
vi.mock('@/helpers/debounce.js')

describe('useGameStore', () => {
  let gameStore
  let playerStore

  beforeEach(() => {
    setActivePinia(createPinia())

    gameStore = useGameStore()
    playerStore = usePlayerStore()
    playerStore.playerId = 'test-player-id'
    playerStore.playerName = 'Test Player'

    socket.emit.mockClear()
    socket.on.mockClear()
    socket.off.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    expect(gameStore.gameId).toBeNull()
    expect(gameStore.words).toEqual([])
    expect(gameStore.finalLetterIndex).toBe(0)
    expect(gameStore.letterIndex).toBe(0)
    expect(gameStore.gameState).toEqual([])
    expect(gameStore.gameStart).toBeNull()
    expect(gameStore.playerWon).toBe(false)
    expect(gameStore.playerLost).toBe(false)
    expect(gameStore.gameJoined).toBe(false)
  })

  it('should join a game and emit socket event', () => {
    gameStore.joinGame('game123')
    expect(gameStore.gameId).toBe('game123')
    expect(socket.emit).toHaveBeenCalledWith('join', 'game123', {
      playerId: 'test-player-id',
    })
  })

  it('should create a game by joining', () => {
    gameStore.createGame('game456')
    expect(gameStore.gameId).toBe('game456')
    expect(socket.emit).toHaveBeenCalledWith('join', 'game456', {
      playerId: 'test-player-id',
    })
  })

  it('should leave the game and clean up', () => {
    gameStore.joinGame('game999')
    gameStore.leaveGame()
    expect(socket.emit).toHaveBeenCalledWith('leave', 'game999')
    expect(socket.off).toHaveBeenCalledWith('game999')
    expect(gameStore.gameId).toBeNull()
    expect(gameStore.words).toEqual([])
    expect(gameStore.letterIndex).toBe(0)
    expect(gameStore.gameState).toEqual([])
    expect(gameStore.gameStart).toBeNull()
    expect(gameStore.finalLetterIndex).toBe(0)
    expect(gameStore.playerWon).toBe(false)
    expect(gameStore.playerLost).toBe(false)
  })

  it('should submit word when is first in array', () => {
    gameStore.joinGame('testgame')
    const { words } = storeToRefs(gameStore)
    words.value = ['test', 'aaa']
    const success = gameStore.submitWord('test')

    expect(success).toEqual(true)
  })
})

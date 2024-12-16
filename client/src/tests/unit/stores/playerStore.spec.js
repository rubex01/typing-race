import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlayerStore } from '@/stores/player.js'

describe('playerStore', () => {
  let playerStore

  beforeEach(() => {
    setActivePinia(createPinia())
    playerStore = usePlayerStore()
  })

  it('should have initial state', () => {
    expect(playerStore.playerName).toBeNull()
    expect(playerStore.playerEmail).toBeNull()
    expect(playerStore.remoteId).toBeNull()
    expect(playerStore.isReady).toBe(false)
  })

  it('should set player name', () => {
    const playerName = 'John Doe'
    playerStore.setPlayer(playerName)

    expect(playerStore.playerName).toBe(playerName)
    expect(playerStore.isReady).toBe(true)
  })

  it('should be ready if only playerName is set', () => {
    const playerName = 'Jane Doe'
    playerStore.playerName = playerName

    expect(playerStore.playerName).toBe(playerName)
    expect(playerStore.isReady).toBe(true)
  })

  it('should clear player state', () => {
    playerStore.setPlayer('John Doe', 'a@a.nl', '123')
    playerStore.clearPlayerState()

    expect(playerStore.playerName).toBeNull()
    expect(playerStore.playerEmail).toBeNull()
    expect(playerStore.remoteId).toBeNull()
    expect(playerStore.isReady).toBe(false)
  })
})

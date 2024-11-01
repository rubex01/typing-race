import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlayerStore } from '@/stores/player.js'
import { v4 as uuidv4 } from 'uuid'

vi.mock('uuid', () => ({
  v4: vi.fn(),
}))

describe('playerStore', () => {
  let playerStore

  beforeEach(() => {
    setActivePinia(createPinia())
    playerStore = usePlayerStore()
    uuidv4.mockReset()
  })

  it('should have initial state', () => {
    expect(playerStore.playerName).toBeNull()
    expect(playerStore.playerId).toBeNull()
    expect(playerStore.isReady).toBe(false)
  })

  it('should set player name and generate player ID', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000'
    uuidv4.mockReturnValue(mockUuid)

    const playerName = 'John Doe'
    playerStore.setPlayer(playerName)

    expect(playerStore.playerName).toBe(playerName)
    expect(playerStore.playerId).toBe(mockUuid)
    expect(playerStore.isReady).toBe(true)
    expect(uuidv4).toHaveBeenCalledTimes(1)
  })

  it('should not be ready if only playerName is set', () => {
    const playerName = 'Jane Doe'
    playerStore.playerName = playerName

    expect(playerStore.playerName).toBe(playerName)
    expect(playerStore.playerId).toBeNull()
    expect(playerStore.isReady).toBe(false)
  })

  it('should not be ready if only playerId is set', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174001'
    playerStore.playerId = mockUuid

    expect(playerStore.playerName).toBeNull()
    expect(playerStore.playerId).toBe(mockUuid)
    expect(playerStore.isReady).toBe(false)
  })
})

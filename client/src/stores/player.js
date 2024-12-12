import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref(null)
  const playerId = ref(null)
  const playerEmail = ref(null)
  const remoteId = ref(null)

  const isReady = computed(
    () =>
      playerName.value !== null &&
      playerName.value !== '' &&
      playerId.value !== null
  )

  const setPlayer = (name, email = null, id = null) => {
    playerName.value = name
    remoteId.value = id
    playerEmail.value = email
    playerId.value = uuidv4()
  }

  const clearPlayerState = () => {
    playerName.value = null
    playerId.value = null
    playerEmail.value = null
    remoteId.value = null
  }

  return { setPlayer, isReady, playerId, playerName, clearPlayerState }
})

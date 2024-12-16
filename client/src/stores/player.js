import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref(null)
  const playerEmail = ref(null)
  const remoteId = ref(null)

  const isReady = computed(
    () =>
      playerName.value !== null &&
      playerName.value !== ''
  )

  const setPlayer = (name, email = null, id = null) => {
    playerName.value = name
    remoteId.value = id
    playerEmail.value = email
  }

  const clearPlayerState = () => {
    playerName.value = null
    playerEmail.value = null
    remoteId.value = null
  }

  return { setPlayer, isReady, playerName, clearPlayerState, playerEmail, remoteId }
})

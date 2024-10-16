import {computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref(null)
  const playerId = ref(null);

  const isReady = computed(() => playerName.value !== null)

  const setPlayer = (name) => {
    playerName.value = name;
  }

  return { setPlayer, isReady }
})

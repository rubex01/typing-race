import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const usePlayerStore = defineStore('player', () => {
  const playerName = ref(null)
  const playerId = ref(null);

  const isReady = computed(() => playerName.value !== null && playerId.value !== null)

  const setPlayer = (name) => {
    playerName.value = name;
    playerId.value = uuidv4();
  }

  return { setPlayer, isReady, playerId, playerName }
})

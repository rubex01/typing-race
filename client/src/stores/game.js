import {computed, ref, watch} from 'vue'
import { defineStore } from 'pinia'
import socket from "@/services/socket.js";

export const useGameStore = defineStore('game', () => {
  const gameId = ref(null)
  const words = ref(['a', 'as', 'fd', 'adsf', 'bgfds', 'cxv', 'asdf']);
  const wordIndex = ref(0)
  const gameData = ref([]);

  const isPlaying = computed(() => gameId.value !== null)

  const joinGame = (id) => {
    gameId.value = id;
    socket.emit('join', gameId.value)
  }

  const createGame = (id) => {
    gameId.value = id;
    socket.emit('join', gameId.value)
  }

  watch(gameId, (newValue, oldValue) => {
    unsubscribeSocket(oldValue)
    clearGameData()
    subscribeSocket(newValue)
  })

  const clearGameData = () => gameData.value = []

  const unsubscribeSocket = (id) => socket.off(id)

  const subscribeSocket = (id) => socket.on(id, (data) => {
    gameData.value.push(data);
  });

  const appendData = (data) => {
    socket.emit('gameEvent', gameId.value, data);
  }

  return { gameId, joinGame, isPlaying, gameData, appendData, createGame }
})

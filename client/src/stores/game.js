import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import {socket} from '@/services/socket.js'
import debounce from '@/helpers/debounce.js'
import { usePlayerStore } from '@/stores/player.js'
import {useResultStore} from "@/stores/result.js";

export const useGameStore = defineStore('game', () => {
  const gameId = ref(null)
  const words = ref([])
  const finalLetterIndex = ref(0)
  const letterIndex = ref(0)
  const gameState = ref([])
  const gameStart = ref(null)
  const now = ref(null)
  const playerWon = ref(false)
  const playerLost = ref(false)

  const playerStore = usePlayerStore()
  const { playerId, playerName } = storeToRefs(playerStore)

  const resultStore = useResultStore()

  const gameJoined = computed(() => gameId.value !== null)
  const gameStarted = computed(
    () => gameStart.value && gameStart.value <= now.value,
  )
  const doneTyping = computed(() => letterIndex.value >= finalLetterIndex.value)

  const joinGame = id => {
    if (id === '') return
    gameId.value = id
    socket.emit('join', gameId.value, {
      playerId: playerId.value,
    })
  }

  const createGame = id => joinGame(id)

  watch(gameId, (newValue, oldValue) => {
    unsubscribeSocket(oldValue)
    readyForNewGame()
    subscribeSocket(newValue)
  })

  const readyForNewGame = () => {
    gameState.value = []
    words.value = []
    letterIndex.value = 0
    gameStart.value = null
    now.value = null
    finalLetterIndex.value = 0
    playerWon.value = false
    playerLost.value = false
  }

  const clearGameState = () => {
    readyForNewGame()
    gameId.value = null
  }

  const unsubscribeSocket = id => socket.off(id)

  const subscribeSocket = id =>
    socket.on(id, data => {
      handleServerData(data)
    })

  const handleServerData = data => {
    switch (data.type) {
      case 'gameStart':
        handleGameStart(data.data)
        break
      case 'gameEvent':
        updateGameState(data.data)
        break
      case 'gameWinner':
        handleGameWinner(data.data)
        break
    }
  }

  const handleGameWinner = data => {
    if (playerId.value === data.winner) {
      playerWon.value = true
      return
    }
    playerLost.value = true
  }

  const handleGameStart = data => {
    words.value = data.words
    finalLetterIndex.value = words.value.join('').length
    gameStart.value = new Date(data.startTime)
    now.value = new Date()
    const interval = setInterval(() => {
      now.value = new Date()
      if (gameStart.value < now.value) {
        clearInterval(interval)
      }
    }, 1000)
  }

  const updateGameState = newData => {
    if (newData.playerId === playerId.value) {
      return
    }
    const index = gameState.value.findIndex(
      playerState => playerState.playerId === newData.playerId,
    )
    if (index === -1) {
      gameState.value.push(newData)
      return
    }
    gameState.value[index] = newData
  }

  const submitWord = word => {
    if (word !== words.value[0]) {
      return false
    }
    words.value.shift()
    letterIndex.value += word.length
    return true
  }

  const debouncedSendLetterIndex = debounce(async index => {
    socket.emit('gameEvent', gameId.value, {
      playerId: playerId.value,
      playerName: playerName.value,
      letterIndex: index,
    })
    if (doneTyping.value) {
      await resultStore.loadAverageWPM();
    }
  }, 300)

  watch(letterIndex, newIndex => {
    debouncedSendLetterIndex(newIndex)
  })

  const leaveGame = () => {
    socket.emit('leave', gameId.value)
    unsubscribeSocket(gameId.value)
    gameId.value = null
    readyForNewGame()
  }

  return {
    gameId,
    joinGame,
    gameJoined,
    gameState,
    submitWord,
    createGame,
    words,
    letterIndex,
    gameStarted,
    gameStart,
    leaveGame,
    doneTyping,
    playerWon,
    playerLost,
    finalLetterIndex,
    clearGameState,
  }
})

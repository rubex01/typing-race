import {computed, ref, watch} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import socket from "@/services/socket.js";
import debounce from "@/helpers/debounce.js";
import {usePlayerStore} from "@/stores/player.js";

export const useGameStore = defineStore('game', () => {
  const gameId = ref(null)
  const words = ref([
    'Iedereen', 'is', 'aan', 'het', 'slapen,', 'maar', 'Pim', 'staat', 'buiten.',
    'Wat', 'is', 'het', 'koud!', 'En', 'wat', 'is', 'het', 'spannend.', 'Pim',
    'heeft', 'van', 'te', 'voren', 'goed', 'opgelet', 'en', 'bekeken', 'hoe',
    'hij', 'moet', 'lopen.', 'Hij', 'heeft', 'zelfs', 'een', 'plattegrondje', 'meegenomen.'
  ]);
  const letterIndex = ref(0)
  const gameState = ref([]);

  const playerStore = usePlayerStore();
  const { playerId, playerName } = storeToRefs(playerStore);

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
    clearGameState()
    subscribeSocket(newValue)
  })

  const clearGameState = () => gameState.value = []

  const unsubscribeSocket = (id) => socket.off(id)

  const subscribeSocket = (id) => socket.on(id, (data) => {
    updateGameState(data)
  });

  const updateGameState = (newData) => {
    if (newData.playerId === playerId.value) {
      return;
    }
    const index = gameState.value.findIndex(playerState => playerState.playerId === newData.playerId);
    if (index === -1) {
      gameState.value.push(newData);
      return;
    }
    gameState.value[index] = newData;
  }

  const submitWord = (word) => {
    if (word !== words.value[0]) {
      return false;
    }
    words.value.shift();
    letterIndex.value += word.length;
    return true;
  }

  const debouncedSendLetterIndex = debounce((index) => {
    socket.emit(
        'gameEvent',
        gameId.value,
        {
          playerId: playerId.value,
          playerName: playerName.value,
          letterIndex: index
        }
      );
  }, 800);

  watch(letterIndex, (newIndex) => {
    debouncedSendLetterIndex(newIndex);
  });

  return { gameId, joinGame, isPlaying, gameState, submitWord, createGame, words, letterIndex }
})

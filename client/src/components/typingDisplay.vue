<script setup>
import {useGameStore} from "@/stores/game.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const gameStore = useGameStore();
const { words, gameId, gameState, letterIndex } = storeToRefs(gameStore);

const wordsWithIndex = computed(() => {
  let cumulativeLength = 0;
  return words.value.map((word) => {
    const wordInfo = { word: word, letterIndex: cumulativeLength };
    cumulativeLength += word.length;
    return wordInfo;
  });
});

const playersThatAreFurther = computed(() => {
  return gameState.value.filter(player => player.letterIndex > letterIndex.value);
})
</script>

<template>
  <div class="word-container">
    <div v-for="word in wordsWithIndex" class="word">
      {{ word.word }}
      <div v-for="player in playersThatAreFurther">
        <div class="bar" v-if="player.letterIndex > (word.letterIndex + letterIndex)"></div>
        <div class="player-highlight" v-if="player.letterIndex === (word.letterIndex + word.word.length + letterIndex)">{{ player.playerName }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.word-container {
  flex-wrap: wrap;
  display: flex;
  gap: 3rem;
}

.word {
  font-size: 1.3rem;
}

.bar {
  width: 100%;
  height: 5px;
  background: red;
  animation: slide;
  animation-duration: .5s;
  animation-fill-mode: both;
}

.player-highlight {
  position: absolute;
}

@keyframes slide {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>

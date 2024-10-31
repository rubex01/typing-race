<script setup>
import {useGameStore} from "@/stores/game.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import WordsPerMinute from "@/components/wordsPerMinute.vue";

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
  <div class="typing-display">
    <div v-for="word in wordsWithIndex" class="typing-display-word">
      {{ word.word }}
      <div v-for="player in playersThatAreFurther">
        <div class="typing-display-bar" v-if="player.letterIndex > (word.letterIndex + letterIndex)"></div>
        <div class="typing-display-player-tag" v-if="player.letterIndex === (word.letterIndex + word.word.length + letterIndex)">{{ player.playerName }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.typing-display {
  flex-wrap: wrap;
  display: flex;
  gap: 3rem;
  position: relative;
  overflow: hidden;

  &-word {
    font-size: 1.3rem;
  }

  &-bar {
    width: 100%;
    height: 5px;
    background: rgb(255, 0, 0, .5);
    animation: slide;
    animation-duration: .5s;
    animation-fill-mode: both;
  }

  &-player-tag {
    position: absolute;
    background: white;
    border: 1px solid black;
    padding: 0.3rem;
    border-radius: 0.3rem;

    &:hover {
      z-index: 1;
    }
  }
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

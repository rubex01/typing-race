<script setup>
import { useGameStore } from '@/stores/game.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import {useSettingStore} from "@/stores/setting.js";

const gameStore = useGameStore()
const { words, gameState, letterIndex } = storeToRefs(gameStore)

const settingsStore = useSettingStore()
const { showOtherPlayerStatus } = storeToRefs(settingsStore)

const wordsWithIndex = computed(() => {
  let cumulativeLength = 0
  return words.value.map(word => {
    const wordInfo = { word: word, letterIndex: cumulativeLength }
    cumulativeLength += word.length
    return wordInfo
  })
})

const playersThatAreFurther = computed(() => {
  if (!showOtherPlayerStatus.value) {
    return []
  }
  return gameState.value.filter(
    player => player.letterIndex > letterIndex.value,
  )
})
</script>

<template>
  <div class="typing-display">
    <div
      v-for="(word, index) in wordsWithIndex"
      :key="`${index}${word}`"
      class="typing-display-word"
    >
      {{ word.word }}
      <div v-for="player in playersThatAreFurther" :key="player.playerId">
        <div
          class="typing-display-bar"
          v-if="player.letterIndex > word.letterIndex + letterIndex"
        ></div>
        <div
          class="typing-display-player-tag"
          v-if="
            player.letterIndex ===
            word.letterIndex + word.word.length + letterIndex
          "
        >
          {{ player.playerName }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.typing-display {
  flex-wrap: wrap;
  display: flex;
  gap: 2rem;
  position: relative;
  overflow: hidden;

  &-word {
    font-size: 1.3rem;
  }

  &-bar {
    width: 100%;
    height: 0.5rem;
    background: variables.$typing-bar;
    animation: slide;
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }

  &-player-tag {
    position: absolute;
    background: variables.$typing-player;
    margin-top: 0.3rem;
    max-width: 6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #ffffff;
    padding: 0.3rem 0.5rem;
    border-radius: 1rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    font-weight: 500;

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

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
</style>

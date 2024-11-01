<script setup>
import TypingDisplay from '@/components/typingDisplay.vue'
import TypingForm from '@/components/typingForm.vue'
import GameInfo from '@/components/gameInfo.vue'
import WordsPerMinute from '@/components/wordsPerMinute.vue'
import LeaveGame from '@/components/leaveGame.vue'
import { useGameStore } from '@/stores/game.js'
import { storeToRefs } from 'pinia'
import YouWon from '@/components/youWon.vue'
import YouLost from '@/components/youLost.vue'
import { computed } from 'vue'

const gameStore = useGameStore()
const { playerWon, playerLost } = storeToRefs(gameStore)
const doneTyping = computed(() => gameStore.doneTyping)
</script>

<template>
  <div class="game-page">
    <typing-display class="game-page-display" />
    <div class="game-page-input">
      <div class="game-page-input-tags">
        <words-per-minute class="game-page-input-tags-wpm" />
        <leave-game class="game-page-input-tags-leave" />
      </div>
      <typing-form v-if="!doneTyping" />
    </div>
    <game-info />
    <you-won v-if="playerWon" />
    <you-lost v-else-if="playerLost" />
  </div>
</template>

<style scoped lang="scss">
.game-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  &-input {
    display: flex;

    &-tags {
      margin: 1rem 1rem 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-leave {
        width: 100%;
        margin-top: 1rem;
      }
    }
  }

  &-display {
    height: 13rem;
    overflow: hidden;
    width: 100%;
  }
}
</style>

<script setup>
import { useGameStore } from '@/stores/game.js'

const gameStore = useGameStore()
</script>

<template>
  <button @click="gameStore.leaveGame" class="leave-game">Leave</button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.leave-game {
  background: variables.$leave-button;
  color: variables.$leave-button-color;
  border-radius: 3rem;
  border: none;
  font-weight: 500;
  padding: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
}
</style>

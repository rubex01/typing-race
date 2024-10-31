<script setup>

import {useGameStore} from "@/stores/game.js";

const gameStore = useGameStore();
</script>

<template>
  <button @click="gameStore.leaveGame" class="leave-game">
    Leave
  </button>
</template>

<style scoped lang="scss">
.leave-game {
  background: rgb(255 0 0 / 50%);
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &:hover {
    cursor: pointer;
  }
}
</style>

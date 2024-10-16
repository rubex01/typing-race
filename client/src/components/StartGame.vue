<script setup>

import {useGameStore} from "@/stores/game.js";

const gameStore = useGameStore()

const startGame = () => {
  const random = 'test' + new Date().getSeconds();
  gameStore.createGame(random)
}
</script>

<template>
  <div>
    <button @click="startGame">Start game</button>
  </div>
</template>

<style scoped>

</style>

<script setup>

import {ref} from "vue";
import {useGameStore} from "@/stores/game.js";

const gameId = ref();

const gameStore = useGameStore();

const joinGame = (event) => {
  event.preventDefault()
  gameStore.joinGame(gameId.value);
}
</script>

<template>
  <div>
    <form @submit="joinGame">
      <input v-model="gameId">
      <button type="submit">join</button>
    </form>
  </div>
</template>

<style scoped>

</style>

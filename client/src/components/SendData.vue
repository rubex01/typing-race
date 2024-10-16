<script setup>

import {ref} from "vue";
import {useGameStore} from "@/stores/game.js";
import {storeToRefs} from "pinia";

const test = ref();

const gameStore = useGameStore()
const { gameData, gameId } = storeToRefs(gameStore)

const go = (e) => {
  e.preventDefault()
  gameStore.appendData({data: test.value});
  test.value = ''
}
</script>

<template>
  <div>
    gameid: {{ gameId }}
    <form @submit="go">
      <input v-model="test" />
      <button type="submit">Ja</button>
    </form>
    <p>{{ gameData }}</p>
  </div>

</template>

<style scoped>

</style>

<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import {useGameStore} from "@/stores/game.js";
import {storeToRefs} from "pinia";

const gameStore = useGameStore();
const { letterIndex, gameStart } = storeToRefs(gameStore);

const wordsPerMinute = ref(0);

const calculateWordsPerMinute = () => {
  const secondsPassed = (new Date() - gameStart.value) / 1000;
  wordsPerMinute.value = Math.floor(((letterIndex.value / 5)  / secondsPassed) * 60);
}

let interval = null;
onMounted(() => {
  interval = setInterval(calculateWordsPerMinute, 1000);
})
onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="words-per-minute">
    {{ wordsPerMinute }} WPM
  </div>
</template>

<style scoped lang="scss">
.words-per-minute {
  background: rgb(66 255 66 / 50%);
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

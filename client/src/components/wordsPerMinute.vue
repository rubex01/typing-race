<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useGameStore } from '@/stores/game.js'
import { storeToRefs } from 'pinia'
import {useSettingStore} from "@/stores/setting.js";

const WORD_LENGTH = 5
const SPACES_PER_WORD = 1
const SECONDS_IN_MINUTE = 60

const gameStore = useGameStore()
const { letterIndex, gameStart } = storeToRefs(gameStore)

const settingsStore = useSettingStore()
const { showCurrentWPM } = storeToRefs(settingsStore)

const doneTyping = computed(() => gameStore.doneTyping)
const wordsPerMinute = ref(0)

const calculateWordsPerMinute = () => {
  const secondsPassed = (new Date() - gameStart.value) / 1000
  wordsPerMinute.value = Math.floor(
    ((letterIndex.value / secondsPassed) * SECONDS_IN_MINUTE) /
      (WORD_LENGTH - SPACES_PER_WORD),
  )
}

let interval = null

onMounted(() => {
  interval = setInterval(calculateWordsPerMinute, 1000)
})

onUnmounted(() => clearInterval(interval))

watch(doneTyping, newValue => {
  if (newValue === true) {
    clearInterval(interval)
  }
})
</script>

<template>
  <div class="words-per-minute" v-if="showCurrentWPM || doneTyping">{{ wordsPerMinute }} WPM</div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.words-per-minute {
  background: variables.$button;
  color: variables.$button-color;
  border-radius: 3rem;
  font-weight: 500;
  padding: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGameStore } from '@/stores/game.js'
import { storeToRefs } from 'pinia'
import GameInfo from '@/components/gameInfo.vue'

const gameStore = useGameStore()
const { gameStart } = storeToRefs(gameStore)
const countdown = ref(null)

const countdownText = computed(() =>
  countdown.value ? `${countdown.value} seconds` : '',
)

const setCountdown = () => {
  if (!gameStart) {
    return
  }
  countdown.value = Math.ceil((gameStart.value - new Date()) / 1000)
}

let interval = null

onMounted(() => {
  interval = setInterval(setCountdown, 100)
})
onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="wait-page">
    <div class="wait-page-text">
      <h1 class="title" v-if="gameStart">
        Game is starting in {{ countdownText }}
      </h1>
      <h1 class="title" v-else>Waiting for other players</h1>
    </div>
    <game-info />
  </div>
</template>

<style scoped lang="scss">
.wait-page {
  &-text {
    margin-bottom: 3rem;
  }
}
</style>

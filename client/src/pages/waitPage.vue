<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useGameStore } from '@/stores/game.js'
import { storeToRefs } from 'pinia'
import GameInfo from '@/components/gameInfo.vue'
import CountDown from '@/components/countDown.vue'
import WaitingForPlayers from '@/components/waitingForPlayers.vue'

const gameStore = useGameStore()
const { gameStart } = storeToRefs(gameStore)
const countdown = ref(null)

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
      <count-down v-if="gameStart" :countdown-text="countdown" />
      <waiting-for-players v-else />
    </div>
    <game-info />
  </div>
</template>

<style scoped lang="scss">
.wait-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &-text {
    margin-bottom: 3rem;
  }
}
</style>

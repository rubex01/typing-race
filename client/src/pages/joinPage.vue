<script setup>
import JoinGame from '@/components/joinGame.vue'
import StartGame from '@/components/startGame.vue'
</script>

<template>
  <div class="join-page">
    <join-game />
    <start-game />
  </div>
</template>

<style scoped lang="scss">
.join-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}
</style>

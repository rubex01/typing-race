<script setup>
import JoinGame from "@/components/joinGame.vue";
import StartGame from "@/components/startGame.vue";
</script>

<template>
  <div class="container">
    <join-game />
    <start-game />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
</style>

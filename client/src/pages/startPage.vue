<script setup>
import PlayerCreation from "@/components/playerCreation.vue";
</script>

<template>
  <div>
    <div class="text">
      <h1 class="title">Your</h1>
      <h1 class="title">Player Tag</h1>
    </div>
    <player-creation />
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 0;
  margin-top: 0;
}

.text {
  margin-bottom: 3rem;
}
</style>

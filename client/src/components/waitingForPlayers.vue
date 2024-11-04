<script setup>
import search from '@/assets/images/search.png'

defineProps({
  countdownText: String,
})
</script>

<template>
  <div class="waiting-for-players">
    <img :src="search" alt="search" class="waiting-for-players-image" />
    <div class="waiting-for-players-text">
      <h1>Waiting for</h1>
      <h1>other players</h1>
      <h1>to join</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.waiting-for-players {
  display: flex;
  align-items: center;
  justify-content: center;

  &-image {
    width: 15rem;
  }

  &-text {
  }
}
</style>

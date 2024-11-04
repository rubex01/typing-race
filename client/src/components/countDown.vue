<script setup>
import clock from '@/assets/images/clock.png'

defineProps({
  countdownText: String,
})
</script>

<template>
  <div class="countdown">
    <img :src="clock" alt="clock" class="countdown-image" />
    <div class="countdown-text">
      <h1 class="countdown-text-intro">Game is starting in</h1>
      <h1 class="countdown-text-number">{{ countdownText }}</h1>
      <h1 class="countdown-text-seconds">seconds</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.countdown {
  display: flex;
  align-items: center;
  justify-content: center;

  @include mixins.mobile {
    flex-direction: column;
  }

  &-image {
    width: 15rem;
  }

  &-text {
    &-intro {
      margin: 0;
    }

    &-seconds {
      position: absolute;
      margin-top: -10rem;
      margin-left: 6rem;
      transition: 0.3s;
    }

    &-number {
      margin: 0;
      font-size: 10rem;
    }
  }
}
</style>

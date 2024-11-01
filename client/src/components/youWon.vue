<script setup>
import confetti from 'canvas-confetti'
import { onMounted } from 'vue'

const count = 200
const defaults = {
  origin: { y: 0.7 },
}

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  })
}

onMounted(() => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
})
</script>

<template>
  <div class="you-won">
    <h1 class="you-won-title">You Won</h1>
  </div>
</template>

<style scoped lang="scss">
.you-won {
  &-title {
    font-size: 7rem;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    animation: fade-out;
    animation-duration: 2.5s;
    animation-fill-mode: both;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    z-index: 1;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>

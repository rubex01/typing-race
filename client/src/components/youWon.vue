<script setup>
import confetti from 'canvas-confetti'
import { onMounted } from 'vue'
import winner from '@/assets/images/winner.png'
import crown from '@/assets/images/crown.png'

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
    <img :src="winner" alt="You won" class="you-won-text" />
    <img :src="crown" alt="Crown" class="you-won-crown" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.you-won {
  width: 100%;
  position: fixed;
  display: flex;
  top: 30%;
  left: 0;
  align-items: center;
  justify-content: center;

  &-text {
    animation: fade-out;
    animation-delay: 1.5s;
    animation-duration: 4.5s;
    animation-fill-mode: both;
    width: 50rem;

    @include mixins.mobile {
      width: 20rem;
    }
  }

  &-crown {
    margin-left: 48rem;
    animation-name: fall-down;
    animation-delay: 2s;
    animation-duration: 3.7s;
    animation-fill-mode: both;
    position: absolute;
    width: 14rem;
    z-index: -1;
    margin-top: -6rem;

    @include mixins.mobile {
      width: 6rem;
      margin-top: -2.5rem;
      margin-left: 19rem;
    }
  }
}

@keyframes fall-down {
  0% {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }

  30% {
    opacity: 1;
    transform: translateY(1rem) rotate(20deg);
  }

  to {
    opacity: 0;
    transform: translateY(50rem);
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

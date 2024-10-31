<script setup>

</script>

<template>
  <div class="you-lost">
    <h1 class="you-lost-title">You lost</h1>
  </div>
</template>

<style scoped lang="scss">
.you-lost {
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
    color: rgba(255, 0, 0, .5)
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

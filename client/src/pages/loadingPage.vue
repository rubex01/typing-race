<script setup>

</script>

<template>
  <div class="loading-page">
    <div class="loading-page-key key-1">L</div>
    <div class="loading-page-key key-2">O</div>
    <div class="loading-page-key key-3">A</div>
    <div class="loading-page-key key-4">D</div>
    <div class="loading-page-key key-5">I</div>
    <div class="loading-page-key key-6">N</div>
    <div class="loading-page-key key-7">G</div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &-key {
    background: variables.$background;
    color: variables.$text;
    font-size: 1rem;
    font-weight: bold;
    width: 3rem;
    height: 3rem;
    margin: .4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    position: relative;
    box-shadow: variables.$neumorphism;
  }
}

@for $i from 1 through 7 {
  .key-#{$i} {
    animation: press 2s infinite;
    animation-delay: 0.1s * ($i - 1);
  }
}

@keyframes press {
  0% {
    box-shadow: variables.$neumorphism;
    background: variables.$background;
    color: variables.$text;
  }
  20% {
    box-shadow: variables.$neumorphism;
    background: variables.$background;
  }
  30% {
    box-shadow: inset 5px 5px 10px #dadada, inset -3px -3px 20px #ffffff;
    background: lighten(variables.$background, 5%);
    color: variables.$text-active;
  }
  40% {
    box-shadow: variables.$neumorphism;
    background: variables.$background;
    color: variables.$text;
  }
  100% {
    box-shadow: variables.$neumorphism;
    background: variables.$background;
  }
}
</style>

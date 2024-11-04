<script setup></script>

<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.page {
  padding: 10rem;
  box-sizing: border-box;
  height: 100%;

  @include mixins.mobile {
    padding: 1rem;
  }
}
</style>

<script setup></script>

<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins';

.page {
  padding: 10rem;

  @include mobile {
    padding: 1rem;
  }
}
</style>

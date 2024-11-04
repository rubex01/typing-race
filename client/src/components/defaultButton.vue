<script setup></script>

<template>
  <button class="button" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

.button {
  font-size: 3rem;
  border: none;
  cursor: pointer;
  background: variables.$button;
  color: variables.$button-color;
  box-shadow: variables.$button-shadow;
  border-radius: 3rem;
  font-weight: 500;
  padding: 1.5rem 3rem;

  @include mixins.mobile {
    padding: 1rem;
    font-size: 1rem;
  }
}
</style>

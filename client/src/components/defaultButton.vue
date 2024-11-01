<script setup></script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  font-weight: 900;
  font-size: 5rem;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>

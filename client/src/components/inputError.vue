<script setup>
defineProps({
  errors: {
    type: Array,
    required: false,
  }
})

</script>

<template>
  <div class="input-error">
    <p class="input-error-message" v-for="error in errors" :key="error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

.input-error {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 3rem;

  @include mixins.mobile {
    padding: 0 1rem;
  }

  &-message {
    margin: 0;
    color: variables.$text-error;
  }
}
</style>

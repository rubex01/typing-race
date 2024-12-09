<script setup>

defineProps({
  modelValue: String,
  options: {
    type: Array,
    required: true,
  }
})

defineEmits(['update:modelValue'])

</script>

<template>
  <div class="option-selector">
    <button
      v-for="option in options"
      :key="option"
      @click="$emit('update:modelValue', option)"
      style="cursor: pointer;"
      class="option-selector-option"
      :class="modelValue === option ? 'option-selector-option-selected' : ''"
    >
      {{ option }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.option-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;

  &-option {
    color: variables.$text;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    background: transparent;

    &-selected {
      color: variables.$text-active;
    }
  }
}
</style>

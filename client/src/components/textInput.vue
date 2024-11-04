<script setup>
import { ref } from 'vue'
defineProps({
  modelValue: String,
})

defineEmits(['update:modelValue'])

const input = ref()

const focus = () => {
  input.value?.focus()
}

defineExpose({ focus })
</script>

<template>
  <input
    ref="input"
    type="text"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="custom-input"
  />
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

.custom-input {
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 3rem;
  background: variables.$background;
  box-shadow: variables.$neumorphism;
  font-size: 3rem;
  transition: 0.3s;
  font-weight: 500;

  &::placeholder {
    color: variables.$text-placeholder;
    font-weight: normal;
  }

  @include mixins.mobile {
    padding: 1rem;
    font-size: 1rem;
  }
}

.custom-input:hover {
  transform: scale(1.01);
}

.custom-input:focus {
  outline: none;
}
</style>

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
  <div class="input-container">
    <input
      ref="input"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="custom-input"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins';

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-input {
  padding: 3rem 5rem;
  width: 100%;
  border: none;
  border-radius: 3rem;
  background: #ffffff;
  box-shadow:
    20px 20px 60px #d9d9d9,
    -20px -20px 60px #ffffff;
  font-size: 3rem;
  transition: 0.3s;
  font-weight: 500;

  @include mobile {
    padding: 1rem;
  }
}

.custom-input:hover {
  transform: scale(1.01);
}

.custom-input:focus {
  outline: none;
}
</style>

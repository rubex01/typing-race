<script setup>
defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const hide = () => {
  emit('update:modelValue', false);
}

const preventHide = (event) => {
  event.stopPropagation();
}
</script>

<template>
  <div class="dialog-backdrop" v-if="modelValue" @click="hide">
    <div class="dialog" @click="preventHide">
      <slot name="header" />
      <slot name="content" />
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .dialog {
    background-color: variables.$background;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0 62px rgba(0, 0, 0, .2);
  }
}
</style>

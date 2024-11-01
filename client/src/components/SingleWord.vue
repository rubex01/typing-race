<script setup>
defineProps({
  word: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <span>
    {{ word }}
  </span>
</template>

<style scoped lang="scss"></style>

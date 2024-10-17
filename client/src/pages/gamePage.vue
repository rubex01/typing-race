<script setup>
import TypingDisplay from "@/components/typingDisplay.vue";
import TypingForm from "@/components/typingForm.vue";
import GameInfo from "@/components/gameInfo.vue";
</script>

<template>
  <div class="container">
    <typing-display class="display" />
    <typing-form class="typing" />
    <game-info />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}
.display {
  height: 13rem;
  overflow: hidden;
  width: 100%;
}
</style>

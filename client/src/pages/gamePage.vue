<script setup>
import TypingDisplay from "@/components/typingDisplay.vue";
import TypingForm from "@/components/typingForm.vue";
import GameInfo from "@/components/gameInfo.vue";
import WordsPerMinute from "@/components/wordsPerMinute.vue";
</script>

<template>
  <div class="game-page">
    <typing-display class="game-page-display" />
    <div class="game-page-input">
      <div class="game-page-input-wpm">
        <words-per-minute />
      </div>
      <typing-form />
    </div>
      <game-info />
  </div>
</template>

<style scoped lang="scss">
.game-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  &-input {
    display: flex;

    &-wpm {
      margin-right: 1rem;
    }
  }

  &-display {
    height: 13rem;
    overflow: hidden;
    width: 100%;
  }
}

</style>

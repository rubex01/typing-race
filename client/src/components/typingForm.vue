<script setup>
import {onMounted, ref} from "vue";
import {useGameStore} from "@/stores/game.js";
import TextInput from "@/components/textInput.vue";

const form = ref();
const word = ref();
const input = ref();

const gameStore = useGameStore()

const submitIfSpace = (event) => {
  if (event.code !== 'Space') {
    return;
  }
  submitForm(event);
};

const submitForm = (e) => {
  e.preventDefault();
  const success = gameStore.submitWord(word.value.trim());
  if (success === false) {
    return;
  }
  word.value = '';
}

onMounted(() => {
  input.value?.focus();
})
</script>

<template>
  <div>
    <form ref="form" @submit="submitForm" @keyup="submitIfSpace">
      <text-input ref="input" v-model="word" />
    </form>
  </div>

</template>

<style scoped>

</style>

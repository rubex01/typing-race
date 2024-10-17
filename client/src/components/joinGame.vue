<script setup>

import {ref} from "vue";
import {useGameStore} from "@/stores/game.js";
import DefaultButton from "@/components/defaultButton.vue";
import TextInput from "@/components/textInput.vue";

const gameId = ref();

const gameStore = useGameStore();

const joinGame = (event) => {
  event.preventDefault()
  gameStore.joinGame(gameId.value);
}
</script>

<template>
  <div>
    <form @submit="joinGame" class="form">
      <text-input class="input" v-model="gameId" />
      <default-button type="submit">join</default-button>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
}

.input {
  margin-right: 4rem;
}
</style>

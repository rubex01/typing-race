<script setup>

import {ref} from "vue";
import {useGameStore} from "@/stores/game.js";
import {storeToRefs} from "pinia";
import {usePlayerStore} from "@/stores/player.js";
import TextInput from "@/components/textInput.vue";

const form = ref();
const word = ref();

const gameStore = useGameStore()
const { gameId, words } = storeToRefs(gameStore)

const playerStore = usePlayerStore();
const { playerId} = storeToRefs(playerStore)

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
</script>

<template>
  <div>
<!--    <table>-->
<!--      <tr>-->
<!--        <td>gameid</td>-->
<!--        <td> {{ gameId }}</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>playerId</td>-->
<!--        <td>{{ playerId }}</td>-->
<!--      </tr>-->
<!--    </table>-->
    <form ref="form" @submit="submitForm" @keyup="submitIfSpace">
      <text-input v-model="word" />
    </form>
  </div>

</template>

<style scoped>

</style>

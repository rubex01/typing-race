<script setup>
import {ref} from "vue";
import {usePlayerStore} from "@/stores/player.js";

const playerStore = usePlayerStore();

const name = ref('');

const savePlayer = (event) => {
  event.preventDefault()
  playerStore.setPlayer(name)
}

</script>

<template>
  <div>
    <form @submit="savePlayer">
      <input v-model="name">
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>

</style>

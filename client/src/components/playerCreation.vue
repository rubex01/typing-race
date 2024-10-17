<script setup>
import {ref} from "vue";
import {usePlayerStore} from "@/stores/player.js";
import TextInput from "@/components/textInput.vue";

const playerStore = usePlayerStore();

const name = ref('');

const savePlayer = (event) => {
  event.preventDefault()
  playerStore.setPlayer(name.value)
}

</script>

<template>
  <div>
    <form @submit="savePlayer">
      <text-input v-model="name" />
    </form>
  </div>
</template>

<style scoped>

</style>

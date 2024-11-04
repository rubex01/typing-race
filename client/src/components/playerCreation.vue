<script setup>
import { ref } from 'vue'
import { usePlayerStore } from '@/stores/player.js'
import TextInput from '@/components/textInput.vue'

const playerStore = usePlayerStore()

const name = ref('')

const savePlayer = event => {
  event.preventDefault()
  if (name.value === '') return
  playerStore.setPlayer(name.value)
}
</script>

<template>
  <form @submit="savePlayer" class="player-creation">
    <text-input
      v-model="name"
      placeholder="Your player name"
      required="required"
      class="player-creation-input"
    />
  </form>
</template>

<style scoped lang="scss">
.player-creation {
  &-input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>

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
  <div>
    <form @submit="savePlayer">
      <text-input v-model="name" />
    </form>
  </div>
</template>

<style scoped lang="scss"></style>

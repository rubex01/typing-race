<script setup>
import { v4 as uuidv4 } from 'uuid'
import { useGameStore } from '@/stores/game.js'
import DefaultButton from '@/components/defaultButton.vue'

const gameStore = useGameStore()

const startGame = () => {
  gameStore.createGame(uuidv4())
}
</script>

<template>
  <div>
    <default-button @click="startGame">Start your own game</default-button>
  </div>
</template>

<style scoped lang="scss"></style>

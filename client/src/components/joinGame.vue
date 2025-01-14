<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/game.js'
import DefaultButton from '@/components/defaultButton.vue'
import TextInput from '@/components/textInput.vue'

const gameId = ref('')

const gameStore = useGameStore()

const joinGame = event => {
  event.preventDefault()
  if (gameId.value === '') {
    return
  }
  gameStore.joinGame(gameId.value)
}
</script>

<template>
  <div class="join-form">
    <form @submit="joinGame" class="join-game-form">
      <text-input
        class="join-game-form-input"
        v-model="gameId"
        required="required"
        placeholder="Game id"
      />
      <default-button type="submit" class="join-game-form-button"
        >Join</default-button
      >
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.join-game {
  &-form {
    display: flex;

    &-input {

      @include mixins.mobile {
        width: 18rem;
      }

      &:hover {
        transform: none;
      }
    }

    &-button {
      margin-left: -12rem;
      width: 12rem;
    }
  }
}
</style>

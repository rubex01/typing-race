<script setup>
import leave from '@/assets/images/leave.png'
import {usePlayerStore} from "@/stores/player.js";

const playerStore = usePlayerStore();

const signOut = () => {
  playerStore.signOut()
}
</script>

<template>
  <button class="sign-out" @click="signOut">
    <img :src="leave" class="sign-out-image"  alt=""/>
    <span class="sign-out-text">sign out</span>
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.sign-out {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  &-image {
    width: 2rem;
    height: 2rem;
  }

  &-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: variables.$text;
    margin-left: 1rem;
  }
}
</style>

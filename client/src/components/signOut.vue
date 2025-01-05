<script setup>
import leave from '@/assets/images/leave.png'
import {signOutUser} from "@/services/userService.js";

const signOut = () => signOutUser();
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

  &:hover {
    & img {
      transform: translateX(-.2rem);
    }
  }

  &-image {
    width: 2rem;
    height: 2rem;
    transition: .3s;
  }

  &-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: variables.$text;
    margin-left: 1rem;
  }
}
</style>

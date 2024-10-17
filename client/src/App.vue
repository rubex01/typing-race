<script setup>
import {usePlayerStore} from "@/stores/player.js";
import {computed} from "vue";
import {useGameStore} from "@/stores/game.js";
import PageLayout from "@/layouts/pageLayout.vue";
import StartPage from "@/pages/startPage.vue";
import JoinPage from "@/pages/joinPage.vue";
import GamePage from "@/pages/gamePage.vue";

const playerStore = usePlayerStore();
const gameStore = useGameStore();

const isReady = computed(() => playerStore.isReady)
const isPlaying = computed(() => gameStore.isPlaying)

</script>

<template>
  <page-layout>
    <start-page v-if="!isReady" />
    <join-page v-else-if="!isPlaying" />
    <game-page v-else />
  </page-layout>
</template>

<style scoped>

</style>

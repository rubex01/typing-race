<script setup>
import {usePlayerStore} from "@/stores/player.js";
import {computed} from "vue";
import {useGameStore} from "@/stores/game.js";
import PageLayout from "@/layouts/pageLayout.vue";
import StartPage from "@/pages/startPage.vue";
import JoinPage from "@/pages/joinPage.vue";
import GamePage from "@/pages/gamePage.vue";
import WaitPage from "@/pages/waitPage.vue";
import YouWon from "@/components/youWon.vue";

const playerStore = usePlayerStore();
const gameStore = useGameStore();

const isReady = computed(() => playerStore.isReady)
const gameJoined = computed(() => gameStore.gameJoined)
const gameStarted = computed(() => gameStore.gameStarted)

</script>

<template>
  <page-layout>
    <start-page v-if="!isReady" />
    <join-page v-else-if="!gameJoined" />
    <wait-page v-else-if="!gameStarted" />
    <game-page v-else />
  </page-layout>
</template>

<style scoped>

</style>

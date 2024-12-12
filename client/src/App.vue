<script setup>
import { usePlayerStore } from '@/stores/player.js'
import {computed, onBeforeMount} from 'vue'
import { useGameStore } from '@/stores/game.js'
import PageLayout from '@/layouts/pageLayout.vue'
import StartPage from '@/pages/startPage.vue'
import JoinPage from '@/pages/joinPage.vue'
import GamePage from '@/pages/gamePage.vue'
import WaitPage from '@/pages/waitPage.vue'
import {checkIfLoggedIn} from "@/services/userService.js";
import {useLoadingStore} from "@/stores/loading.js";
import LoadingPage from "@/pages/loadingPage.vue";

const playerStore = usePlayerStore()
const gameStore = useGameStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading)
const isReady = computed(() => playerStore.isReady)
const gameJoined = computed(() => gameStore.gameJoined)
const gameStarted = computed(() => gameStore.gameStarted)

onBeforeMount(() => {
  checkIfLoggedIn()
})
</script>

<template>
  <page-layout>
    <loading-page v-if="isLoading" />
    <start-page v-if="!isReady" />
    <join-page v-else-if="!gameJoined" />
    <wait-page v-else-if="!gameStarted" />
    <game-page v-else />
  </page-layout>
</template>

<style scoped lang="scss"></style>

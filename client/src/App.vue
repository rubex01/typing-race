<script setup>
import {usePlayerStore} from "@/stores/player.js";
import PlayerCreation from "@/components/PlayerCreation.vue";
import {computed} from "vue";
import JoinGame from "@/components/JoinGame.vue";
import StartGame from "@/components/StartGame.vue";
import {useGameStore} from "@/stores/game.js";
import SendData from "@/components/SendData.vue";

const playerStore = usePlayerStore();
const gameStore = useGameStore();

const isReady = computed(() => playerStore.isReady)
const isPlaying = computed(() => gameStore.isPlaying)

</script>

<template>
  <div>
    <player-creation v-if="!isReady" />
    <div v-else-if="!isPlaying">
      <join-game />
      <start-game />
    </div>
    <div v-else>
      <send-data />
    </div>
  </div>
</template>

<style scoped>

</style>

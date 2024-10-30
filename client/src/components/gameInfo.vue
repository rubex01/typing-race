<script setup>
import {useGameStore} from "@/stores/game.js";
import {storeToRefs} from "pinia";
import {usePlayerStore} from "@/stores/player.js";

const gameStore = useGameStore();
const { gameId } = storeToRefs(gameStore);

const playerStore = usePlayerStore();
const { playerId, playerName } = storeToRefs(playerStore);

</script>

<template>
  <table>
    <tbody>
      <tr>
        <td>GameId</td>
        <td>{{ gameId }}</td>
      </tr>
      <tr>
        <td>UserId</td>
        <td>{{ playerId }}</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ playerName }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>

<script setup>
import profile from '@/assets/images/profile.png'
import {storeToRefs} from "pinia";
import {usePlayerStore} from "@/stores/player.js";
import {useResultStore} from "@/stores/result.js";
import {computed} from "vue";

const playerStore = usePlayerStore();
const {playerName} = storeToRefs(playerStore);

const resultStore = useResultStore();
const {averageWPM} = storeToRefs(resultStore);

const highAverageWPM = computed(() => averageWPM.value > 100)
</script>

<template>
  <div class="player-info">
    <div>
      <img :src="profile" class="player-info-image"/>
    </div>
    <div class="player-info-text">
      <div class="player-info-text-name">{{ playerName }}</div>
      <div class="player-info-text-wpm" :class="highAverageWPM ? 'player-info-text-wpm-high' : ''">
        {{ averageWPM ?? 0 }}wpm
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.player-info {
  display: flex;

  &-image {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  &-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: variables.$text;
    }

    &-wpm {
      font-size: 1rem;
      font-weight: bold;
      color: variables.$text;

      &-high {
        opacity: .5;
        background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff00ff);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient 5s ease infinite;
      }
    }
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


</style>

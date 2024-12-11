<script setup>
import PlayerInfo from "@/components/playerInfo.vue";
import {usePlayerStore} from "@/stores/player.js";
import {computed} from "vue";
import SignOut from "@/components/signOut.vue";
import PlayerSettings from "@/components/settingsButton.vue";

const playerStore = usePlayerStore();
const isReady = computed(() => playerStore.isReady)

</script>

<template>
  <div class="page">
    <slot />
    <div class="page-overlay" v-if="isReady">
      <sign-out />
      <player-settings />
      <player-info />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.page {
  padding: 10rem;
  box-sizing: border-box;
  height: 100%;

  @include mixins.mobile {
    padding: 1rem;
  }

  &-overlay {
    gap: 2rem;
    display: flex;
    border-radius: 1rem;
    position: fixed;
    top: 3rem;
    right: 4rem;
  }
}
</style>

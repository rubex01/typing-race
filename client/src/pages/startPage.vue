<script setup>
import PlayerCreation from '@/components/playerCreation.vue'
import profile from '@/assets/images/profile.png'
</script>

<template>
  <div class="start-page">
    <img :src="profile" class="start-page-image" alt="profile image" />
    <player-creation class="start-page-player-creation" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.start-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;

  &-player-creation {
    padding: 1.8rem 0 1.8rem 0;
    width: 100%;
    box-sizing: border-box;
  }

  @include mixins.mobile {
    flex-direction: column;
  }
}
</style>

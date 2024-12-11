<script setup>
import settings from '@/assets/images/settings.png'
import DefaultDialog from "@/components/defaultDialog.vue";
import SettingPanel from "@/components/settingPanel.vue";
import {ref} from "vue";

const showSettings = ref(false)
</script>

<template>
  <div class="player-settings">
    <button class="player-settings-button" @click="showSettings = true">
      <img :src="settings" alt="" />
      <span>settings</span>
    </button>
    <default-dialog v-model="showSettings">
      <template v-slot:header>
          <h1 class="player-settings-title">Settings</h1>
      </template>
      <template v-slot:content>
        <setting-panel />
      </template>
    </default-dialog>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.player-settings {
  display: flex;

  &-title {
    margin-top: 0;
    color: variables.$text;
  }

  &-button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;

    & img {
      width: 2rem;
      height: 2rem;
    }

    & span {
      font-size: 1.5rem;
      font-weight: bold;
      color: variables.$text;
      margin-left: 1rem;
    }
  }
}
</style>

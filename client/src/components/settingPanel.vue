<script setup>
import toggleOff from '@/assets/images/toggleOff.png'
import toggleOn from '@/assets/images/toggleOnn.png'
import {useSettingStore} from "@/stores/setting.js";
import {storeToRefs} from "pinia";

const settingStore = useSettingStore();
const {
  showOtherPlayerStatus,
  showCurrentWPM,
} = storeToRefs(settingStore)

</script>

<template>
  <div class="setting-panel">
    <button class="setting-panel-item"  @click="showOtherPlayerStatus = !showOtherPlayerStatus">
      <img :src="showOtherPlayerStatus ? toggleOn : toggleOff" class="setting-panel-item-image" />
      <h2 class="setting-panel-item-text">show the status of other players</h2>
    </button>
    <button class="setting-panel-item" @click="showCurrentWPM = !showCurrentWPM">
      <img :src="showCurrentWPM ? toggleOn : toggleOff" class="setting-panel-item-image" />
      <h2 class="setting-panel-item-text">show your current WPM when typing</h2>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.setting-panel {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-item {
    display: flex;
    background: transparent;
    border: none;
    cursor: pointer;
    align-items: center;
    width: 100%;

    &-text {
      font-size: 1.5rem;
      font-weight: bold;
      color: variables.$text;
      margin-left: auto;
    }

    &-image {
      width: 10rem;
      height: 10rem;
      margin-right: 2rem;
    }
  }
}
</style>

<script setup>
import {useSettingStore} from "@/stores/setting.js";
import {storeToRefs} from "pinia";
import ToggleInput from "@/components/toggleInput.vue";

const settingStore = useSettingStore();
const {
  showOtherPlayerStatus,
  showCurrentWPM,
} = storeToRefs(settingStore)

</script>

<template>
  <div class="setting-panel">
    <toggle-input v-model="showOtherPlayerStatus" class="setting-panel-item" label="show the status of other players" />
    <toggle-input v-model="showCurrentWPM" class="setting-panel-item" label="show your current WPM when typing" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.setting-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  &-item {
    width: 100%;

    &-image {
      width: 10rem;
      height: 10rem;
      margin-right: 2rem;
    }

    &-text {
      font-size: 1.5rem;
      font-weight: bold;
      color: variables.$text;
      margin: 0 0 0 auto;
    }
  }
}
</style>

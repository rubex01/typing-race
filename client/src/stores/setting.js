import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {

  const showCurrentWPM = ref(true)
  const showOtherPlayerStatus = ref(true)

  return {
    showCurrentWPM,
    showOtherPlayerStatus
  }
})

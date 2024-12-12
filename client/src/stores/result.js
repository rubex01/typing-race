import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResultStore = defineStore('result', () => {

  const averageWPM = ref(0)

  const clearResultState = () => {
    averageWPM.value = 0
  }

  return {
    setAverageWPM: (value) => averageWPM.value = value,
    averageWPM,
    clearResultState
  }
})

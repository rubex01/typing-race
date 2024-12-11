import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getAverageWPM} from "@/services/resultService.js";

export const useResultStore = defineStore('result', () => {

  const averageWPM = ref(0)

  const loadAverageWPM = async () => {
    const response = await getAverageWPM();
    const data = response.data;
    if (!data?.average) {
      return;
    }

    averageWPM.value = data.average;
  }

  return {
    loadAverageWPM,
    averageWPM
  }
})

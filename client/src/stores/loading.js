import {computed, ref} from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(true)

  const isLoading = computed(() => loading.value)

  return {
    setLoading: (value) => loading.value = value,
    loading,
    isLoading,
  }
})

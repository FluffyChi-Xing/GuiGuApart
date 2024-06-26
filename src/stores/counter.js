import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const collapse = ref(false)
  const drawer = ref(false)
  return { count, doubleCount, collapse,drawer }
})

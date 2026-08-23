import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTestStore = defineStore('test', () => {
  const count = ref<number>(10);

  return { count };
});

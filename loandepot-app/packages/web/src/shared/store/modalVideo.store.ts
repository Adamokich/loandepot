import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalVideoStore = defineStore('modalVideo', () => {
  const isOpen = ref<boolean>(false);
  const videoUrl = ref<string>('');
  const videoName = ref<string>('');

  function openVideoModal(url: string): void {
    isOpen.value = true;
    videoUrl.value = url;
  }

  function closeVideoModal(): void {
    console.log('close');
    isOpen.value = false;
    videoUrl.value = '';
  }

  return { isOpen, videoUrl, videoName, openVideoModal, closeVideoModal };
});

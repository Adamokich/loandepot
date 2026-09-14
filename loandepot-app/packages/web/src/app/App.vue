<script setup lang="ts">
import { VideoModal } from '@/shared';
import { useModalVideoStore } from '@/shared/store/modalVideo.store';
import AppLayout from './layouts/AppLayout.vue';
const videoModalStore = useModalVideoStore();
</script>

<template>
  <AppLayout>
    <RouterView></RouterView>
  </AppLayout>
  <VideoModal
    :video-url="videoModalStore.videoUrl"
    :name="videoModalStore.videoName"
    :is-open="videoModalStore.isOpen"
    @close="videoModalStore.closeVideoModal"
  />
</template>

<style></style>

<script setup lang="ts">
import { VideoModal } from '@/shared';
import { useModalVideoStore } from '@/shared/store/modalVideo.store';
const videoModalStore = useModalVideoStore();
</script>

<template>
  <RouterView></RouterView>
  <VideoModal
    :video-url="videoModalStore.videoUrl"
    :name="videoModalStore.videoName"
    :is-open="videoModalStore.isOpen"
    @close="videoModalStore.closeVideoModal"
  />
</template>

<style></style>

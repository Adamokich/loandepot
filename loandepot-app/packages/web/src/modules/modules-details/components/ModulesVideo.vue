<script setup lang="ts">
import { useModalVideoStore } from '@/shared';

import ShareIcon from '@/shared/components/icons/ShareIcon.vue';
import type { IModule } from '@loandepot/types';
import { inject, ref } from 'vue';
import PlayVideo from './PlayVideo.vue';
import LockVideo from './LockVideo.vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const modalVideoStore = useModalVideoStore();
const firstVideoOpened = ref<boolean>(false);
const { videoUrl, moduleImgUrl } = defineProps<Pick<IModule, 'videoUrl' | 'moduleImgUrl'>>();
const isMobile = inject(isMobileKey);
const bgImgStyles = `rgba(42, 42, 42, 0.44) url(${moduleImgUrl}) center center / cover no-repeat`;

function openFirstVideo(): void {
  modalVideoStore.openVideoModal(videoUrl);
  firstVideoOpened.value = true;
}
</script>

<template>
  <div class="modules-video" :style="{ background: !isMobile ? bgImgStyles : '' }">
    <PlayVideo @click="openFirstVideo" />
    <LockVideo :is-opened="firstVideoOpened" :video-url="videoUrl" />
    <div class="share">
      <span>Share this module</span>
      <ShareIcon color="#fff" />
    </div>
  </div>
</template>

<style scoped>
.modules-video {
  position: relative;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  padding: 64px 64px 44px 64px;
  background-color: #fff;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  max-height: 720px;
}

.share {
  font-size: 13px;
  font-weight: 700;
  background-color: var(--color-success);
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 202px;
  border-radius: var(--border-radius);
  color: var(--color-light);
  transition: transform 0.3s ease;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .modules-video {
    background-color: var(--color-accent);
    padding-left: 28px;
  }
}

@media (max-width: 480px) {
  .modules-video {
    padding-left: 15px;
  }
}
</style>

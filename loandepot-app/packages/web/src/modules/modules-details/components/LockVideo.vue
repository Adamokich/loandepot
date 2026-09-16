<script setup lang="ts">
import { PlayVideoButton, useModalVideoStore } from '@/shared';
import LockIcon from '@/shared/components/icons/LockIcon.vue';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';

const { isOpened, videoUrl } = defineProps<{ isOpened: boolean; videoUrl: string }>();
const modalVideoStore = useModalVideoStore();
</script>

<template>
  <div class="closed-video">
    <span class="closed-video-title">Evolve</span>
    <div v-if="!isOpened" class="closed-video-bottom">
      <PlayVideoButton bg-color="D8D8D8">
        <LockIcon />
      </PlayVideoButton>
      <span
        >Please watch <br />
        the first video before</span
      >
    </div>
    <div v-else class="unlock-video" @click="modalVideoStore.openVideoModal(videoUrl)">
      <PlayVideoButton bg-color="6D53AF">
        <PlayIcon :width="14" :height="16" color="#FFFFFF" />
      </PlayVideoButton>
      <span>Play video</span>
    </div>
  </div>
</template>

<style scoped>
.closed-video {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 490px;
  height: 242px;
  background-color: var(--color-light);
  padding-block: 24px 28px;
  padding-left: 32px;
  border-radius: var(--border-radius-l);
}

.closed-video-bottom {
  display: flex;
  align-items: center;
  gap: 24px;
  transition: transform 0.3s ease;
  cursor: pointer;

  span {
    font-weight: 900;
  }
}

.closed-video-title {
  font-size: 32px;
  font-family: var(--font-mark);
  font-weight: 700;
}

.unlock-video {
  display: flex;
  width: 100%;
  max-width: 222px;
  align-items: center;
  gap: 24px;
  transition: transform 0.3s ease;
  cursor: pointer;

  span {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
  }
}

@media (max-width: 1200px) {
  .closed-video {
    height: 195px;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .closed-video {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 140px;
  }
  .closed-video-bottom {
    span {
      display: none;
    }

    button {
      margin-right: 20px;
    }
  }

  .unlock-video {
    span {
      display: none;
    }
  }
}

@media (hover: hover) {
  .closed-video-bottom:hover,
  .unlock-video:hover {
    transform: translateY(-8px);
  }
}
</style>

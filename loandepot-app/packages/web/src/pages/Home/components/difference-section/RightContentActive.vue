<script setup lang="ts">
import { PlayVideoButton, useModalVideoStore } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import ScheduleIcon from '@/shared/components/icons/ScheduleIcon.vue';

const modalVideoStore = useModalVideoStore();
</script>

<template>
  <div class="difference-right-active">
    <div class="difference-right-top">
      <ScheduleIcon />
      <h2>Learn more</h2>
      <p>Check the video to see more difference between yesterday’s and today’s LO.</p>
    </div>
    <div class="difference-right-video">
      <img src="../../../../app/assets/img/ShowUpBg_1.jpg" alt="video preview" />
      <div
        class="difference-right-video-controller"
        @click="modalVideoStore.openVideoModal('https://youtube.com/embed/uyAMGPoE1dU')"
      >
        <PlayVideoButton>
          <PlayIcon :width="14" :height="16" />
        </PlayVideoButton>
        <span>Play video</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.difference-right-active {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 530px;
  padding-top: 66px;
}

.difference-right-top {
  p {
    font-size: 15px;
    font-weight: 900;
  }
}

.difference-right-top :deep(svg) {
  position: absolute;
  right: 40px;
  top: 40px;
}

.difference-right-video {
  position: relative;

  img {
    width: 100%;
    max-width: 663px;
    height: 400px;
    object-fit: cover;
  }
}

.difference-right-video-controller {
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  left: 32px;
  bottom: 32px;

  span {
    color: var(--color-light);
    font-size: 16px;
    font-weight: 700;
  }
}

@media (max-width: 1400px) {
  .difference-right-video-controller {
    left: auto;
    right: 32px;
  }
}

@media (max-width: 1023px) {
  .difference-right-active {
    max-width: none;
  }

  .difference-right-top {
    padding-left: 20px;
  }

  .difference-right-active {
    padding-top: 0;

    img {
      max-width: 100%;
    }
  }

  .difference-right-active-top :deep(a) {
    display: none;
  }

  .difference-right-video-controller {
    right: auto;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
  }
}

@media (max-width: 480px) {
  .difference-right-top {
    display: none;
  }

  .difference-right-video {
    img {
      height: auto;
    }
  }
}
</style>

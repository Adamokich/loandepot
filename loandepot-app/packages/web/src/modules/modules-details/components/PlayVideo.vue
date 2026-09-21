<script setup lang="ts">
import { PlayVideoButton } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
</script>

<template>
  <div class="first-video">
    <span class="first-video-title">Show up</span>
    <div class="first-video-play">
      <PlayVideoButton bg-color="6D53AF">
        <PlayIcon :width="14" :height="16" color="#FFFFFF" />
      </PlayVideoButton>
      <span>Play video</span>
    </div>
  </div>
</template>

<style scoped>
.first-video {
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

.first-video-play {
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

.first-video-title {
  font-size: 32px;
  font-family: var(--font-mark);
  font-weight: 700;
  text-transform: uppercase;
}

@media (max-width: 1200px) {
  .first-video {
    height: 190px;
  }
}

@media (max-width: 480px) {
  .first-video {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
  }

  .first-video-title {
    flex-shrink: 0;
  }

  .first-video-play {
    justify-content: end;

    button {
      margin-right: 10px;
    }

    span {
      display: none;
    }
  }
}
</style>

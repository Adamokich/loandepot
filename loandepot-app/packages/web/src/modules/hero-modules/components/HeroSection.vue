<script setup lang="ts">
import { BaseButton, ScheduleButton } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import { ref } from 'vue';

const isPlaying = ref<boolean>(false);
</script>

<template>
  <div class="hero-section">
    <div class="hero-wrapper container">
      <div class="hero-header">
        <p>show<span>up</span>:evolve</p>
        <ScheduleButton />
      </div>
      <div class="hero-main">
        <div class="hero-left">
          <div class="hero-info">
            <h2 class="hero-title">Show Up: <span>Evolve</span></h2>
            <p class="hero-descr">A retail LO’s guide to combating digital disruption</p>
          </div>
          <BaseButton class="hero-button">Get free access</BaseButton>
        </div>
        <div class="hero-video">
          <div v-if="!isPlaying" class="hero-preview" @click="isPlaying = true">
            <img src="../../../app/assets/img/ShowUpBg_2.jpg" alt="ShowUp present" />
            <div class="hero-preview-controller">
              <div class="hero-preview-controller-play">
                <PlayIcon :width="14" :height="16" />
              </div>
              <span>why</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  width: 100%;
}
.hero-wrapper {
  display: flex;
  flex-direction: column;
  gap: 45px;
}

.hero-header {
  display: flex;
  justify-content: space-between;
  align-items: end;

  p {
    font-size: 20px;
    font-weight: 700;
  }

  span {
    color: var(--color-accent);
  }
}

.hero-main {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.hero-left {
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 31px;
}

.hero-info {
  display: flex;
  flex-direction: column;
  line-height: 60px;
}

.hero-title {
  span {
    color: var(--color-accent);
  }
}

.hero-descr {
  font-size: 15px;
  font-weight: 900;
  opacity: 0.5;
}

.hero-video {
  width: 100%;
  height: 100vh;
  max-width: 758px;
  position: relative;

  img {
    width: 100%;
  }
}

.hero-preview-controller {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 20px;
  top: 122px;
  left: 50%;
  transform: translateX(-50%);

  span {
    color: var(--color-light);
    text-transform: uppercase;
    font-weight: 700;
  }
}

.hero-preview-controller-play {
  background-color: var(--color-light);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 4px;
  }
}
</style>

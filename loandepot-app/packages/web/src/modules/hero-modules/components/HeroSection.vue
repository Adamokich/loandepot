<script setup lang="ts">
import { BaseButton, ScheduleButton } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import HeroSectionModules from './HeroSectionModules.vue';
import PlusIcon from '@/shared/components/icons/PlusIcon.vue';
import { useModalVideoStore } from '@/shared/store/modalVideo.store.ts';

const modalVideostore = useModalVideoStore();
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
            <h1 class="hero-title">Show Up: <span>Evolve</span></h1>
            <p class="hero-descr">A retail LO’s guide to combating digital disruption</p>
          </div>
          <BaseButton class="hero-button">Get free access</BaseButton>
        </div>
        <div class="hero-video">
          <div class="hero-preview">
            <img src="../../../app/assets/img/ShowUpBg_2.jpg" alt="ShowUp present" />
            <div
              @click="modalVideostore.openVideoModal('https://youtube.com/embed/uyAMGPoE1dU')"
              class="hero-preview-controller"
            >
              <div class="hero-preview-controller-play">
                <PlayIcon :width="14" :height="16" />
              </div>
              <span>why</span>
            </div>
          </div>
          <div class="hero-modules-view-all">
            <span>Explore all modules</span>
            <RouterLink class="hero-modules-view-all-link" to="#">
              <PlusIcon />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <HeroSectionModules />
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  overflow: hidden;
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
  position: relative;
  display: flex;
  gap: 90px;
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
  max-width: 758px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  transition: transform 0.4s ease;
  cursor: pointer;

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

.hero-modules-view-all {
  position: absolute;
  height: 307px;
  right: 190px;
  bottom: -1px;
  background-color: var(--color-light);
  z-index: 30;
  display: flex;
  justify-content: space-between;
  writing-mode: vertical-rl;
  padding: 32px 30px;
  transform: rotate(180deg);

  span {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
  }
}

.hero-modules-view-all-link {
  display: block;
  width: 20px;
  height: 20px;
  background-color: var(--color-success);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px 4px var(--color-shadow-success);
}
</style>

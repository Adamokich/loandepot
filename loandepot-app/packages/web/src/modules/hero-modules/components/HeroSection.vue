<script setup lang="ts">
import { BaseButton, HeaderDesktop, VideoButton } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import HeroSectionModules from './HeroSectionModules.vue';
import PlusIcon from '@/shared/components/icons/PlusIcon.vue';
import { useModalVideoStore } from '@/shared/store/modalVideo.store.ts';
import { inject } from 'vue';
import HeaderMobile from '@/shared/components/HeaderMobile.vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const modalVideostore = useModalVideoStore();
const isMobile = inject(isMobileKey);
</script>

<template>
  <div class="hero-section">
    <div class="hero-wrapper container">
      <HeaderDesktop v-if="!isMobile" />
      <HeaderMobile v-else />
      <div class="hero-main">
        <div class="hero-left">
          <div class="hero-info">
            <h1 class="hero-title">Show Up: <span>Evolve</span></h1>
            <p class="hero-descr">A retail LO’s guide to combating digital disruption</p>
          </div>
          <div class="hero-links">
            <BaseButton class="hero-button">Get free access</BaseButton>
            <VideoButton v-if="isMobile" />
          </div>
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

@media (max-width: 1470px) {
  .hero-title {
    font-size: 40px;
  }

  .hero-descr {
    line-height: 20px;
  }
}

@media (max-width: 1440px) {
  .hero-modules-view-all {
    writing-mode: unset;
    transform: rotate(0deg);
    height: 70px;
    padding-block: 10px;
    width: 100%;
    max-width: 307px;
    display: flex;
    align-items: center;
    left: 5px;
    bottom: -35px;
  }

  .hero-video {
    position: static;
  }

  .hero-preview {
    position: relative;
  }
}

@media (max-width: 1320px) {
  .hero-main {
    gap: 25px;
  }

  .hero-video {
    max-width: 660px;
  }

  .hero-modules-view-all {
    bottom: 14px;
  }
}

@media (max-width: 1200px) {
  .hero-left {
    flex-shrink: 0;
  }
  .hero-preview {
    display: none;
  }

  .hero-main {
    position: static;
  }

  .hero-modules-view-all {
    color: var(--color-light);
    background-color: var(--color-dark);
    left: 64px;
  }

  .hero-preview-controller {
    display: none;
  }

  .hero-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-wrapper {
    padding-left: 0;
  }

  .hero-links {
    flex-direction: column;
    align-items: start;
  }

  .hero-modules-view-all {
    left: 20px;
  }
}
</style>

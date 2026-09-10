<script setup lang="ts">
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Swiper as SwiperCore } from 'swiper';
import { useModulesStore } from '../store/modules.store';
import { inject, onMounted, ref } from 'vue';
import HeroSectionSlide from './HeroSectionSlide.vue';
import 'swiper/css';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const modulesStore = useModulesStore();
const swiperInstance = ref<SwiperCore | undefined>(undefined);
const isMobile = inject(isMobileKey);

function onSwiperInit(swiper: SwiperCore): void {
  swiperInstance.value = swiper;
}

function onSlideChange(swiper: SwiperCore): void {
  modulesStore.activeIndex = swiper.realIndex;
}

function nextSlide(): void {
  swiperInstance.value?.slideNext();
}

function prevSlide(): void {
  swiperInstance.value?.slidePrev();
}

onMounted(async () => {
  await modulesStore.getModules();
});
</script>

<template>
  <div :class="!isMobile ? 'hero-modules' : 'hero-modules container'">
    <div class="hero-modules-wrapper">
      <div class="hero-modules-left">
        <h3 class="hero-modules-title">Explore 8 Educational Modules To Evolve Your Career</h3>
        <div class="hero-modules-actions">
          <div class="action-left" @click="prevSlide">
            <PlayIcon color="rgba(255, 255, 255, 0.5)" :width="9" :height="11" />
          </div>
          <div class="action-right" @click="nextSlide">
            <PlayIcon color="rgba(255, 255, 255, 0.5)" :width="9" :height="11" />
          </div>
        </div>
      </div>
      <div class="hero-modules-slider">
        <Swiper
          @swiper="onSwiperInit"
          @slide-change="onSlideChange"
          :slides-per-view="'auto'"
          :space-between="24"
          :speed="900"
          :simulate-touch="false"
          :loop="true"
        >
          <SwiperSlide v-for="module in modulesStore.modules" :key="module.moduleId">
            <HeroSectionSlide
              class="hero-section-slide"
              :module-id="module.moduleId"
              :module-name="module.moduleName"
              :module-img-url="module.moduleImgUrl"
              :descr="module.descr"
              :is-active="modulesStore.activeModuleId === module.moduleId"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-modules {
  height: 100vh;
  background-color: var(--color-accent);
  width: 100%;
  max-width: 1130px;
}

.hero-modules-wrapper {
  position: relative;
  width: 100%;
  max-width: 1165px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  overflow: hidden;
  z-index: 20;
  padding-left: 64px;
  padding-block: 40px;
  background-color: var(--color-accent);
  gap: 43px;
  margin-top: -306px;
}

.hero-modules-left {
  display: flex;
  flex-direction: column;
  gap: 53px;
  width: 100%;
  max-width: 300px;
  flex-shrink: 0;
}

.hero-modules-title {
  font-family: var(--font-mark);
  font-size: 28px;
  color: var(--color-light);
}

.hero-modules-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-left,
.action-right {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--color-light-opacity);
  border-radius: 50%;
  width: 43px;
  height: 43px;
  cursor: pointer;
  transition: all 0.4s ease;

  &:active {
    transform: scale(0.8);
  }
}

.action-left {
  svg {
    transform: rotate(180deg);
    margin-right: 3px;
  }
}

.hero-modules-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 860px;
}

.swiper-slide {
  width: 307px;
}

@media (max-width: 1440px) {
  .hero-modules-left {
    position: relative;
  }

  .hero-modules-wrapper {
    justify-content: space-between;
  }

  .hero-modules-slider {
    max-width: 600px;
  }
}

@media (max-width: 1320px) {
  .hero-modules {
    max-width: 900px;
  }

  .hero-modules-left {
    gap: 20px;
  }

  .hero-modules-title {
    font-size: 25px;
  }
}

@media (max-width: 1200px) {
  .hero-modules {
    position: static;
    max-width: 100%;
    margin-top: 47px;
    height: 421px;
  }

  .hero-modules-wrapper {
    position: static;
    padding-left: 0;
    flex-direction: column;
    margin-top: 0;
    gap: 23px;
  }

  .hero-modules-title {
    max-width: 100%;
  }

  .hero-modules-slider {
    max-width: 750px;
  }

  .hero-modules-actions {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-modules {
    padding-left: 20px;
  }
}
</style>

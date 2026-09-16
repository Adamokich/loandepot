<script setup lang="ts">
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Swiper as SwiperCore } from 'swiper';
import { inject, onMounted, ref } from 'vue';
import HeroSectionSlide from './HeroSectionSlide.vue';
import 'swiper/css';
import PlusIcon from '@/shared/components/icons/PlusIcon.vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';
import { useModulesStore } from '@/shared/index.ts';

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
      <div class="hero-modules-view-all">
        <span>Explore all modules</span>
        <RouterLink class="hero-modules-view-all-link" to="/modules">
          <PlusIcon />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-modules {
  position: absolute;
  background-color: var(--color-accent);
  width: 100%;
  max-width: 1251px;
  height: 307px;
  bottom: 0;
}

.hero-modules-wrapper {
  position: relative;
  width: 100%;
  max-width: 1251px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  overflow: hidden;
  z-index: 20;
  padding-left: 64px;
  padding-block: 40px;
  background-color: var(--color-accent);
  gap: 43px;
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

.hero-modules-view-all {
  position: absolute;
  height: 307px;
  width: 100%;
  max-width: 86px;
  top: 0;
  right: 0;
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
}

@media (max-width: 1320px) {
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
    height: 100vh;
    margin-top: 47px;
  }

  .hero-modules-wrapper {
    padding-left: 0;
    height: 100%;
  }

  .hero-modules-view-all {
    left: 0;
    top: 250px;
    border-radius: var(--border-radius);
    writing-mode: unset;
    transform: rotate(0deg);
    max-width: 307px;
    height: 70px;
    align-items: center;
  }

  .hero-modules-title {
    max-width: 100%;
  }

  .hero-modules-slider {
    max-width: 750px;
  }
}

@media (max-width: 767px) {
  .hero-modules-actions {
    display: none;
  }

  .hero-modules-wrapper {
    flex-direction: column;
    gap: 23px;
  }

  .hero-modules-view-all {
    top: 360px;
    background-color: var(--color-dark);
    color: var(--color-light);
  }
}

@media (max-width: 480px) {
  .hero-modules {
    padding-left: 20px;
  }
}
</style>

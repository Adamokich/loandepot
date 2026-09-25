<script setup lang="ts">
import { ScheduleButton } from '@/shared';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ExploreSectionSlide from './ExploreSectionSlide.vue';
import type { IModule } from '@loandepot/types';
import type { Swiper as SwiperCore } from 'swiper';
import { Autoplay, Scrollbar } from 'swiper/modules';
import { computed } from 'vue';
import { MODULES_AUTOPLAY_DELAY } from '@/shared/constants/sliderConfig.ts';

const { modules, activeIndex } = defineProps<{ modules: IModule[]; activeIndex: number }>();
const emit = defineEmits<{
  (e: 'init', swiper: SwiperCore): void;
  (e: 'change', swiper: SwiperCore): void;
  (e: 'autoplay-progress', progress: number): void;
}>();

const activeModule = computed(() => modules[activeIndex].moduleId);
const swiperModules = [Autoplay, Scrollbar];

function onAutoPlayTimeLeft(swiper: SwiperCore, timer: number, progress: number): void {
  emit('autoplay-progress', (1 - progress) * 100);
}
</script>

<template>
  <div class="right-content">
    <div class="right-content-top">
      <ScheduleButton color="#fff" icon-color="#fff" />
      <Swiper
        class="right-content-slider"
        @swiper="(swiper) => emit('init', swiper)"
        @slide-change="(swiper) => emit('change', swiper)"
        @autoplay-time-left="onAutoPlayTimeLeft"
        :modules="swiperModules"
        :slides-per-view="'auto'"
        :space-between="24"
        :slides-offset-after="420"
        :simulate-touch="false"
        :scrollbar="{
          el: '.custom-slider-scrollbar',
          draggable: true,
          dragSize: 30,
          snapOnRelease: true,
        }"
        :autoplay="{
          delay: MODULES_AUTOPLAY_DELAY,
          disableOnInteraction: false,
          waitForTransition: true,
          stopOnLastSlide: true,
        }"
      >
        <SwiperSlide v-for="module in modules" :key="module.moduleId">
          <ExploreSectionSlide
            :module-id="module.moduleId"
            :key="module.moduleId"
            :module-name="module.moduleName"
            :module-img-url="module.moduleImgUrl"
            :module-descr="module.moduleDescr"
            :is-active="activeModule === module.moduleId"
          />
        </SwiperSlide>
      </Swiper>
      <div class="slider-scrollbar-container">
        <div class="custom-slider-scrollbar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.right-content {
  position: relative;
  height: 100vh;
  background-color: var(--color-accent);
}

.right-content-top {
  display: flex;
  flex-direction: column;
  gap: 78px;
}

.right-content-top :deep(a) {
  justify-content: end;
}

.right-content-slider {
  position: absolute;
  width: 725px;
  top: 140px;
  left: -148px;
  z-index: 5;
}

.swiper-slide {
  width: 100%;
  max-width: 296px;
}

.slider-scrollbar-container {
  position: absolute;
  top: 634px;
  left: 50%;
  height: 8px;
  width: 100%;
  max-width: 449px;
  transform: translateX(-50%);
}

.custom-slider-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
}

:deep(.swiper-scrollbar-drag) {
  position: absolute;
  left: 0;
  top: -12px;
  background-color: var(--color-light);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: grab;
}
</style>

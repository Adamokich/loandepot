<script setup lang="ts">
import ArrowDownIcon from '@/shared/components/icons/ArrowDownIcon.vue';
import LogoIcon from '@/shared/components/icons/LogoIcon.vue';
import { formatNumber } from '@/shared/utils';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade } from 'swiper/modules';
import ModulesVideo from './ModulesVideo.vue';
import { useModulesStore, useSwiper } from '@/shared/index.ts';
import { computed, inject, onMounted } from 'vue';
import ModuleDetails from './ModuleDetails.vue';
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon.vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const { swiperInstance, activeIndex, onSlideNext, onSlidePrev, onSlideChange, onSwiperInit } =
  useSwiper();
const modulesStore = useModulesStore();
const swiperModules = [EffectFade];
const isMobile = inject(isMobileKey);

const totalSlides = computed(() => modulesStore.modules?.length);
const currentModule = computed(() => {
  return modulesStore.modules ? modulesStore.modules[activeIndex.value] : null;
});

const currentSlideNumber = computed(() => activeIndex.value + 1);

const isFirstSlide = computed(() => activeIndex.value === 0);
const isLastSlide = computed(() => {
  return totalSlides.value ? activeIndex.value === totalSlides.value - 1 : false;
});

function prevNumber(): number {
  return isFirstSlide.value ? 0 : activeIndex.value;
}

function nextNumber(): number {
  if (totalSlides.value) {
    return isLastSlide.value ? 0 : activeIndex.value + 2;
  }

  return 1;
}

function goToFirstSlide(): void {
  swiperInstance.value?.slideTo(0);
}

onMounted(async () => {
  await modulesStore.getModules();

  const stateModuleId = +history.state.moduleId;

  if (stateModuleId && modulesStore.modules) {
    const targetIndex = modulesStore.modules.findIndex((m) => m.moduleId === stateModuleId);
    swiperInstance.value?.slideTo(targetIndex);
  }
});
</script>

<template>
  <div class="modules">
    <div v-if="!isMobile" class="modules-slider-panel">
      <div class="modules-slider-panel-wrapper">
        <LogoIcon @click="goToFirstSlide" />
        <div class="modules-slider-panel-controller">
          <span class="slide-name">Module #{{ currentSlideNumber }}</span>
          <span class="slide-number">{{ formatNumber(currentSlideNumber) }}</span>
          <ArrowDownIcon @click="onSlideNext" :height="24" :width="20" />
        </div>
      </div>
    </div>
    <div class="modules-wrapper container">
      <Swiper
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
        :modules="swiperModules"
        :speed="250"
        :slides-per-view="1"
        effect="fade"
        :fade-effect="{ mode: 'cross-fade' }"
        :simulate-touch="false"
        :auto-height="false"
      >
        <SwiperSlide
          class="modules-slider"
          v-for="module in modulesStore.modules"
          :key="module.moduleId"
        >
          <div class="module-wrapper">
            <ModulesVideo :video-url="module.videoUrl" :module-img-url="module.moduleImgUrl" />
            <ModuleDetails
              :module-id="module.moduleId"
              :module-name="module.moduleName"
              :module-descr="module.moduleDescr"
              :module-img-url="module.moduleImgUrl"
              :name="module.name"
              :descr="module.descr"
              :img-url="module.imgUrl"
              :file-url="module.fileUrl"
              :tags="module.tags"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="modules-slider-controller">
        <button class="prev-slide" @click="onSlidePrev" :disabled="isFirstSlide">
          <ArrowRightIcon color="#E2E2E2" />
          <div class="prev-info">
            <span class="slide-number">{{ formatNumber(prevNumber()) }}</span>
            <span>Prev module</span>
          </div>
        </button>
        <div class="module-slide">
          <span>Module {{ currentSlideNumber }}:</span> {{ currentModule?.moduleName }}
        </div>
        <button class="next-slide" @click="onSlideNext" :disabled="isLastSlide">
          <div class="prev-info">
            <span>Next module</span>
            <span class="slide-number">{{ formatNumber(nextNumber()) }}</span>
          </div>
          <ArrowRightIcon color="#E2E2E2" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modules {
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-columns: 84px 1fr;
}

.modules-slider-panel {
  display: flex;
  z-index: 10;
  padding: 37px 25px 32px 25px;
  height: 100vh;
  border-right: 1px solid rgb(0 0 0 / 0.2);
}

.modules-wrapper {
  position: relative;
  max-height: 720px;
  width: 100%;
}

.modules-slider-panel-wrapper {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  max-height: 650px;

  svg {
    cursor: pointer;
  }
}

.modules-slider-panel-controller {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 31px;
  font-size: 13px;

  svg {
    cursor: pointer;
  }

  span {
    transform: rotate(180deg);
    writing-mode: vertical-rl;
  }
}

.module-wrapper {
  display: grid;
  gap: 64px;
  grid-template-columns: 619px 1fr;
}

.module-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 63px;
  padding-inline: 55px;
  width: 100%;
  max-width: 319px;
  border-left: 1px solid var(--color-border-opacity);
  border-right: 1px solid var(--color-border-opacity);
  border-top: 1px solid var(--color-border-opacity);
}

.slide-name {
  color: var(--color-accent);
}

.slide-number {
  color: var(--color-border-opacity);
  font-weight: 700;
}

.container {
  padding-left: 0;
}

.modules-slider-controller {
  position: absolute;
  right: -5px;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 788px;
  max-height: 72px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-dark);
  z-index: 1;
}

.prev-slide,
.next-slide {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 22px;
  padding-top: 21px;
  gap: 24px;
  border-top: 1px solid var(--color-border-opacity);
}

.next-slide {
  padding-left: 36px;
  padding-right: 25px;
}

.prev-slide {
  padding-right: 36px;
  padding-left: 70px;
}

.slide-number {
  color: var(--color-light-opacity);
}

.prev-slide {
  svg {
    transform: rotate(180deg);
  }
}

.prev-info {
  display: flex;
  align-items: center;
  gap: 17px;
}

@media (max-width: 1530px) {
  .modules-wrapper {
    min-width: 360px;
    padding-right: 25px;
  }

  .next-slide {
    padding-right: 25px;
    &::after {
      display: none;
    }

    &::before {
      left: -37px;
    }
  }

  .prev-slide {
    &::after {
      left: -54px;
    }
  }
}

@media (max-width: 1480px) {
  .modules-slider-controller {
    left: 0;
    right: 0;
    bottom: -100px;
  }

  .module-slide {
    padding-inline: 40px;
  }

  .next-slide {
    border-right: 1px solid var(--color-border-opacity);
  }

  .prev-slide {
    padding-left: 25px;
  }

  .module-slide {
    max-width: 281px;
  }
}

@media (max-width: 1380px) {
  .prev-slide {
    padding-left: 10px;
    padding-right: 20px;
  }

  .next-slide {
    padding-right: 25px;
    padding-left: 20px;
  }
}

@media (max-width: 1200px) {
  .modules {
    grid-template-columns: 1fr;
  }

  .module-wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .prev-info {
    display: none;
  }

  .prev-slide,
  .next-slide {
    padding-inline: 32px;
  }
}

@media (max-width: 991px) {
  .modules {
    anchor-name: --modules;
  }

  .module-wrapper {
    position: static;
    display: flex;
    flex-direction: column-reverse;
    padding-left: 25px;
  }

  .modules-slider-controller {
    position-anchor: --modules;
    bottom: anchor(bottom);
    max-width: none;
    font-size: 15px;
    background-color: var(--color-dark);
    color: var(--color-light);
  }

  .module-slide {
    max-width: 310px;
    flex-shrink: 0;
  }

  .prev-slide,
  .next-slide {
    width: 100%;

    svg {
      margin-inline: auto;
    }
  }

  .prev-slide {
    padding-left: 0;
  }
}

@media (max-width: 480px) {
  .module-slide {
    max-width: 110px;
    span {
      display: none;
    }
  }

  .next-slide {
    padding-right: 0;
  }
}
</style>

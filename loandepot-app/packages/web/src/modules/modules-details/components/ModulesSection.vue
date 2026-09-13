<script setup lang="ts">
import ArrowDownIcon from '@/shared/components/icons/ArrowDownIcon.vue';
import LogoIcon from '@/shared/components/icons/LogoIcon.vue';
import { formatNumber } from '@/shared/utils';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade } from 'swiper/modules';
import ModulesVideo from './ModulesVideo.vue';
import { useModulesStore, useSwiper } from '@/shared/index.ts';
import { computed, onMounted } from 'vue';
import ModuleDetails from './ModuleDetails.vue';
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon.vue';
import 'swiper/css';
import 'swiper/css/effect-fade';

const { swiperInstance, activeIndex, onSlideNext, onSlidePrev, onSlideChange, onSwiperInit } =
  useSwiper();
const modulesStore = useModulesStore();
const swiperModules = [EffectFade];

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
    <div class="modules-slider-panel">
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
        :fade-effect="{ mode: 'cross-fade' }"
        :simulate-touch="false"
        effect="fade"
      >
        <SwiperSlide
          class="modules-slider"
          v-for="module in modulesStore.modules"
          :key="module.moduleId"
        >
          <div class="module-wrapper">
            <ModulesVideo :video-url="module.videoUrl" :module-img-url="module.moduleImgUrl" />
            <ModuleDetails
              class="some"
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
          Module {{ currentSlideNumber }}: {{ currentModule?.moduleName }}
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
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 738px;
  max-height: 72px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-dark);
  z-index: 20;
}

.prev-slide,
.next-slide {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 22px;
  gap: 24px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: var(--color-border-opacity);
  }
}

.next-slide {
  &::after {
    height: 63px;
    width: 1px;
    right: -20px;
  }

  &::before {
    top: 0;
    left: -48px;
    width: 229px;
    height: 1px;
  }
}

.prev-slide {
  &::after {
    top: 0;
    right: -47px;
    width: 254px;
    height: 1px;
  }
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
</style>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import LeftContent from './LeftContent.vue';
import RightContent from './RightContent.vue';
import { ErrorMessage, useModulesStore, useSwiper } from '@/shared/index.ts';
import BasePreloader from '@/shared/components/preloaders/BasePreloader.vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const {isActive} = defineProps<{isActive: boolean}>();

const isMobile = inject(isMobileKey);
const isVisible = ref<boolean>(false);

  const shouldAutoPlay = computed<boolean>(() => {
    return isMobile?.value
    ? isVisible.value
    : isActive
  })

const { activeIndex, onSlideNext, onSlideChange, onSwiperInit, onSlidePrev, swiperInstance } =
  useSwiper();

const modulesStore = useModulesStore();
const autoPlayProgress = ref<number>(0);

const exploreSectionRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function handleAutoplayProgress(progress: number): void {
  autoPlayProgress.value = progress;
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    { threshold: 0.5 },
  );

  if (exploreSectionRef.value) {
    observer.observe(exploreSectionRef.value);
  }
});

onBeforeUnmount(() => {
  if (observer && exploreSectionRef.value) {
    observer.unobserve(exploreSectionRef.value);
  }
});

watch([shouldAutoPlay, swiperInstance] as const, ([shouldPlay, swiper]) => {
  if (!swiper?.autoplay) return;

  if (shouldPlay) {
    swiper.autoplay.start();
  } else {
    swiper.autoplay.stop();
    swiper.slideTo(0, 0);
  }
}, {immediate: true})
</script>

<template>
  <div class="explore-modules" ref="exploreSectionRef">
    <div class="explore-modules-wrapper container">
      <BasePreloader v-if="modulesStore.isLoading" />
      <ErrorMessage
        v-else-if="modulesStore.errorMessage"
        :message="modulesStore.errorMessage"
        @retry="modulesStore.getModules"
      />
      <div v-else-if="modulesStore.modules" class="explore-modules-wrapper">
        <LeftContent
          :active-index="activeIndex"
          :total-slides="modulesStore.modules.length"
          :progress="autoPlayProgress"
          @next="onSlideNext"
          @prev="onSlidePrev"
        />
        <RightContent
          :modules="modulesStore.modules"
          :active-index="activeIndex"
          @init="onSwiperInit"
          @change="onSlideChange"
          @autoplay-progress="handleAutoplayProgress"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.explore-modules {
  min-height: 500px;
  contain: opacity layout style;
}

.explore-modules-wrapper {
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 716px 577px;
}

@media (max-width: 1200px) {
  .explore-modules-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 0;
  }
}

@media (max-width: 1023px) {
  .explore-modules {
    padding-top: 325px;
  }
}

@media (max-width: 767px) {
  .explore-modules-wrapper {
    padding-right: 0;
  }
}

@media (max-width: 480px) {
  .explore-modules {
    padding-top: 180px;
  }
}
</style>

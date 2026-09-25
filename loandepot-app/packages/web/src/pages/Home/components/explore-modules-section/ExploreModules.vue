<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import LeftContent from './LeftContent.vue';
import RightContent from './RightContent.vue';
import { useModulesStore, useSwiper } from '@/shared/index.ts';

const { activeIndex, onSlideNext, onSlideChange, onSwiperInit, onSlidePrev, swiperInstance } =
  useSwiper();
const modulesStore = useModulesStore();
const autoPlayProgress = ref<number>(0);

const exploreSectionRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function handleAutoplayProgress(progress: number): void {
  autoPlayProgress.value = progress;
}

onMounted(async () => {
  await modulesStore.getModules();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!swiperInstance.value) return;

        if (entry.isIntersecting) {
          swiperInstance.value.autoplay.start();
        } else {
          swiperInstance.value.autoplay.stop();
          swiperInstance.value.slideTo(0, 0);
        }
      });
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
</script>

<template>
  <div v-if="modulesStore.modules" class="explore-modules" ref="exploreSectionRef">
    <div class="explore-modules-wrapper container">
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
</template>

<style scoped>
.explore-modules-wrapper {
  display: grid;
  grid-template-columns: 1fr 577px;
}
</style>

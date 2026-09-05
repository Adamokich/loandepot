<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import LogoIcon from '../icons/LogoIcon.vue';
import ArrowDownIcon from '../icons/ArrowDownIcon.vue';

const { sections } = defineProps<{ sections: string[] }>();
const currentSlide = ref<number>(0);
const isMobile = ref<boolean>(false);

const currentSectionName = computed<string>(() => {
  return sections[currentSlide.value];
});

const totalSlides = computed<number>(() => {
  return sections.length;
});

const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);
const checkDevice = () => (isMobile.value = innerWidth < 1024);

function nextSlide(): void {
  if (!isMobile.value && currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++;
  }
}

function goToFirstSlide(): void {
  if (!isMobile.value) {
    currentSlide.value = 0;
  }
}

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice);
});
</script>

<template>
  <div :class="['section-slider', { 'is-mobile': isMobile }]">
    <div class="section-slider-panel">
      <LogoIcon class="logo" @click="goToFirstSlide" />
      <div class="section-slider-controller">
        <div class="section-slide-name">
          {{ currentSectionName }}
        </div>
        <div class="section-slide-number">
          {{ formatNumber(currentSlide + 1) }}
        </div>
        <ArrowDownIcon
          class="arrow-down"
          v-if="currentSlide < totalSlides - 1"
          @click="nextSlide"
        />
      </div>
    </div>
    <div class="section-slide-viewport">
      <div
        class="section-slider-track"
        :style="{ transform: `translateY(-${currentSlide * 100}vh)` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-slider {
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-columns: 86px 1fr;
}

.section-slider-panel {
  display: flex;
  flex-shrink: 0;
  z-index: 10;
  flex-direction: column;
  justify-content: space-between;
  padding: 37px 25px 10px 25px;
  height: 100vh;
  border-right: 1px solid rgb(0 0 0 / 0.2);
}

.section-slider-controller {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.section-slide-name,
.section-slide-number {
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  font-size: 13px;
}

.section-slide-name {
  color: var(--color-accent);
  font-weight: 900;
}

.section-slide-number {
  opacity: 0.5;
  font-weight: 700;
}

.logo,
.arrow-down {
  cursor: pointer;
}

.arrow-down {
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-6px);
  }

  &:active {
    transform: scale(0.9);
  }
}

.section-slide-viewport {
  padding-left: 65px;
  height: 100vh;
  overflow: hidden;
  flex-grow: 1;
}

.section-slider-track {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

:deep(.section-slider-track > *) {
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
}
</style>

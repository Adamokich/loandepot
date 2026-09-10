<script setup lang="ts">
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon.vue';
import { isMobileKey } from '@/shared/constants/injectionKeys';
import { formatNumber } from '@/shared/utils';
import { computed, inject, type CSSProperties, type Ref } from 'vue';

const { moduleId, moduleName, descr, moduleImgUrl, isActive } = defineProps<{
  moduleId: number;
  moduleName: string;
  descr: string;
  moduleImgUrl: string;
  isActive: boolean;
}>();

const isMobile = inject(isMobileKey);
const backgroundImg = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 97.999%), url(${moduleImgUrl}) center center / cover no-repeat`;

const inactiveSlideClass = computed<CSSProperties>(() => {
  if (!isMobile?.value) {
    return { opacity: !isActive ? '1' : '0' };
  }

  return {};
});

const activeSlideClass = computed<CSSProperties>(() => {
  if (!isMobile?.value) {
    return { opacity: isActive ? '1' : '0', pointerEvents: isActive ? 'auto' : 'none' };
  }

  return {};
});
</script>

<template>
  <div
    class="hero-section-slide"
    :style="{
      background: backgroundImg,
    }"
  >
    <div v-if="!isMobile" class="slide-inactive" :style="inactiveSlideClass">
      <span class="slide-number">{{ formatNumber(moduleId) }}</span>
      <h4 class="slide-title">{{ moduleName }}</h4>
    </div>

    <div class="slide-active" :style="activeSlideClass">
      <div class="slide-active-header">
        <span>{{ formatNumber(moduleId) }}</span>
        <RouterLink to="#">
          <ArrowRightIcon />
        </RouterLink>
      </div>
      <div class="slide-active-bottom">
        <h4 class="slide-title-active">{{ moduleName }}</h4>
        <p class="slide-descr">{{ descr }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section-slide {
  position: relative;
  border-radius: var(--border-radius-l);
  height: 227px;
}

.slide-inactive,
.slide-active {
  transition: opacity 0.4s ease;
  color: var(--color-light);
  font-size: 13px;
  font-weight: 900;

  span {
    opacity: 0.5;
  }
}

.slide-inactive {
  position: absolute;
  bottom: 39px;
  left: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: 0.5;
}

.slide-active {
  width: 100%;
  height: 100%;
  padding: 32px 30px 30px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slide-active-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }
}

.slide-title,
.slide-title-active {
  font-size: 24px;
}

.slide-active-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.slide-descr {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  opacity: 0.5;
}

@media (max-width: 1200px) {
  .hero-section-slide {
    height: 153px;
  }

  .slide-descr {
    display: none;
  }

  .slide-active {
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .slide-active {
    justify-content: space-between;
  }
}
</style>

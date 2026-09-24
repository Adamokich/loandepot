<script setup lang="ts">
import { useModulesStore } from '@/shared';
import { formatNumber } from '@/shared/utils';
import type { IModule } from '@loandepot/types';
import { computed } from 'vue';

const { moduleId, moduleName, moduleImgUrl, isActive } = defineProps<
  Pick<IModule, 'moduleId' | 'moduleDescr' | 'moduleName' | 'moduleImgUrl'> & { isActive: boolean }
>();

const modulesStore = useModulesStore();

const prevSlide = computed(() => {
  return modulesStore.modules?.find((m) => m.moduleId === moduleId - 1);
});

const backgroundImage = `linear-gradient(180.00deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 97.999%), url(${moduleImgUrl}) center center / cover no-repeat`;
</script>

<template>
  <div class="explore-slide" :style="{ background: backgroundImage }">
    <Transition name="fade" mode="out-in">
      <div v-if="!isActive" class="explore-slide-inactive">
        <span>Module #{{ moduleId }}</span>
        <h3>{{ moduleName }}</h3>
      </div>
      <div v-else class="explore-slide-active">
        <div class="slide-top">
          <span>Module #{{ moduleId }}</span>
          <h3>{{ moduleName }}</h3>
        </div>
        <div class="slide-bottom">
          <div v-show="moduleId !== 1" class="prev-slide-info">
            <span>{{ formatNumber(1) }}</span>
            <p>{{ prevSlide?.moduleDescr }}</p>
          </div>
          <div class="current-slide-info">
            <span>{{ formatNumber(moduleId !== 1 ? 2 : 1) }}</span>
            <p>{{ moduleDescr }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.explore-slide {
  width: 100%;
  max-width: 296px;
  height: 417px;
  display: flex;
  align-items: end;
  padding-left: 32px;
  padding-bottom: 32px;
  border-radius: var(--border-radius-l);
  color: var(--color-light);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.explore-slide-inactive {
  display: flex;
  flex-direction: column;
  gap: 12px;

  span {
    font-weight: 500;
    color: var(--color-light-opacity);
    text-transform: uppercase;
  }

  h3 {
    font-size: 24px;
    font-family: var(--font-mark);
    font-weight: 900;
    color: var(--color-light-opacity);
  }
}

.explore-slide-active {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.slide-bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.slide-top {
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    font-size: 24px;
    font-family: var(--font-mark);
    font-weight: 900;
  }

  span {
    font-weight: 500;
    color: var(--color-light-opacity);
    text-transform: uppercase;
  }
}

.prev-slide-info,
.current-slide-info {
  display: flex;
  gap: 20px;
  align-items: center;

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;

    word-break: break-word;
  }

  span {
    font-weight: 700;
    opacity: 0.5;
  }
}
</style>

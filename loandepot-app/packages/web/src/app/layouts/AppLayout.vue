<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';
import DesktopLayout from './DesktopLayout.vue';
import MobileLayout from './MobileLayout.vue';
import {
  isMobileKey,
  isMobileLargeKey,
  isMobileSmallKey,
} from '@/shared/constants/injectionKeys.ts';

const isMobile = ref<boolean>(false);
const isMobileS = ref<boolean>(false);
const isMobileL = ref<boolean>(false);

provide(isMobileKey, isMobile);
provide(isMobileSmallKey, isMobileS);
provide(isMobileLargeKey, isMobileL);

let mediaMobile: MediaQueryList;
let mediaMobileL: MediaQueryList;
let mediaMobileS: MediaQueryList;

const handleMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = e.matches;
};

const handleMobileSChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobileS.value = e.matches;
};

const handleMobileLChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobileL.value = e.matches;
};

onMounted(() => {
  mediaMobile = window.matchMedia('(max-width: 1200px)');
  mediaMobileL = window.matchMedia('(max-width: 1023px)');
  mediaMobileS = window.matchMedia('(max-width: 767px)');

  handleMobileChange(mediaMobile);
  handleMobileLChange(mediaMobileL);
  handleMobileSChange(mediaMobileS);

  mediaMobile.addEventListener('change', handleMobileChange);
  mediaMobileL.addEventListener('change', handleMobileLChange);
  mediaMobileS.addEventListener('change', handleMobileSChange);
});

onUnmounted(() => {
  if (mediaMobile) mediaMobile.removeEventListener('change', handleMobileChange);
  if (mediaMobileL) mediaMobileL.removeEventListener('change', handleMobileLChange);
  if (mediaMobileS) mediaMobileS.removeEventListener('change', handleMobileSChange);
});
</script>

<template>
  <DesktopLayout v-if="!isMobile" />
  <MobileLayout v-else />
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';
import DesktopLayout from './DesktopLayout.vue';
import MobileLayout from './MobileLayout.vue';
import { isMobileKey, isMobileSmallKey } from '@/shared/constants/injectionKeys.ts';

const isMobile = ref<boolean>(false);
const isMobileS = ref<boolean>(false);

provide(isMobileKey, isMobile);
provide(isMobileSmallKey, isMobileS);

let mediaMobile: MediaQueryList;
let mediaMobileS: MediaQueryList;

const handleMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = e.matches;
};

const handleMobileSChange = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobileS.value = e.matches;
};

onMounted(() => {
  mediaMobile = window.matchMedia('(max-width: 1200px)');
  mediaMobileS = window.matchMedia('(max-width: 767px)');

  handleMobileChange(mediaMobile);
  handleMobileSChange(mediaMobileS);

  mediaMobile.addEventListener('change', handleMobileChange);
  mediaMobileS.addEventListener('change', handleMobileSChange);
});

onUnmounted(() => {
  if (mediaMobile) mediaMobile.removeEventListener('change', handleMobileChange);
  if (mediaMobileS) mediaMobile.removeEventListener('change', handleMobileSChange);
});
</script>

<template>
  <DesktopLayout v-if="!isMobile" />
  <MobileLayout v-else />
</template>

<style scoped></style>

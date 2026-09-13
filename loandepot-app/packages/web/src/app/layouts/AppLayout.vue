<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';
import DesktopLayout from './DesktopLayout.vue';
import MobileLayout from './MobileLayout.vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const isMobile = ref<boolean>(false);
const checkDevice = () => (isMobile.value = innerWidth < 1201);

provide(isMobileKey, isMobile);

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onUnmounted(() => window.removeEventListener('resize', checkDevice));
</script>

<template>
  <DesktopLayout v-if="!isMobile" />
  <MobileLayout v-else />
</template>

<style scoped></style>

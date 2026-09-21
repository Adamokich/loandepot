<script setup lang="ts">
import { HeroSection } from '@/modules/hero-modules';
import { SectionSlider } from '@/shared';
import DifferenceSection from './components/DifferenceSection/DifferenceSection.vue';
import { inject } from 'vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';

const sections = ['Show Up: Evolve', 'Show Up: Evolve'];
const isMobile = inject(isMobileKey);
</script>

<template>
  <component
    :is="!isMobile ? SectionSlider : 'main'"
    v-bind="!isMobile ? { sections: sections } : {}"
  >
    <!-- <HeroSection /> -->
    <DifferenceSection />
  </component>
</template>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>

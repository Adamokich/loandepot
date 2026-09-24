<script setup lang="ts">
import { HeroSection } from '@/modules/hero-modules';
import { SectionSlider } from '@/shared';
import DifferenceSection from './components/difference-section/DifferenceSection.vue';
import { inject } from 'vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';
import ExploreModules from './components/explore-modules-section/ExploreModules.vue';

const sections = ['Show Up: Evolve', 'Show Up: Evolve', 'Explore  the modules'];
const isMobile = inject(isMobileKey);
</script>

<template>
  <component
    :is="!isMobile ? SectionSlider : 'main'"
    v-bind="!isMobile ? { sections: sections } : {}"
  >
    <HeroSection />
    <DifferenceSection />
    <ExploreModules />
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

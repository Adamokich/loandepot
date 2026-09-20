<script setup lang="ts">
import { HeroSection } from '@/modules/hero-modules';
import { SectionSlider } from '@/shared';
import DifferenceSection from './components/DifferenceSection/DifferenceSection.vue';

const sections = ['Show Up: Evolve', 'Show Up: Evolve'];
</script>

<template>
  <SectionSlider :sections="sections">
    <HeroSection />
    <DifferenceSection />
  </SectionSlider>
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

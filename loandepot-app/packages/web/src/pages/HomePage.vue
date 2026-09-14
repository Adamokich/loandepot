<script setup lang="ts">
import { HeroSection } from '@/modules/hero-modules';
import { SectionSlider } from '@/shared';

const sections = ['Show Up: Evolve'];
</script>

<template>
  <SectionSlider :sections="sections">
    <HeroSection />
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

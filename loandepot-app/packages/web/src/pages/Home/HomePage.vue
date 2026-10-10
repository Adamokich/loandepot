<script setup lang="ts">
import { HeroSection } from '@/modules/hero-modules';
import { HeaderMobile, sections, SectionSlider } from '@/shared';
import DifferenceSection from './components/difference-section/DifferenceSection.vue';
import { inject } from 'vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';
import ExploreModules from './components/explore-modules-section/ExploreModules.vue';
import { EvolutionSection } from '@/modules/join-evolution/index.ts';
import ShowingUpSection from './components/showing-up-section/components/ShowingUpSection.vue';
import { ContactSection } from '@/modules/contact/index.ts';

const isMobile = inject(isMobileKey);
</script>

<template>
  <component
    :is="!isMobile ? SectionSlider : 'main'"
    v-bind="!isMobile ? { sections: sections } : {}"
  >
    <HeaderMobile v-if="isMobile" />
    <!-- <HeroSection />
    <DifferenceSection />
    <ExploreModules />
    <EvolutionSection />
    <ShowingUpSection /> -->
    <ContactSection />
  </component>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>

<script setup lang="ts">
import { HeroSection } from '@/modules/hero-modules';
import { HeaderMobile, SECTIONS, SectionSlider } from '@/shared';
import DifferenceSection from './components/difference-section/DifferenceSection.vue';
import { inject, ref } from 'vue';
import { isMobileKey } from '@/shared/constants/injectionKeys.ts';
import ExploreModules from './components/explore-modules-section/ExploreModules.vue';
import { EvolutionSection } from '@/modules/join-evolution/index.ts';
import ShowingUpSection from './components/showing-up-section/components/ShowingUpSection.vue';
import { ContactSection } from '@/modules/contact/index.ts';

const isMobile = inject(isMobileKey);
const currentSection = ref<number>(0);
</script>

<template>
  <component
    :is="!isMobile ? SectionSlider : 'main'"
    v-bind="!isMobile ? { sections: SECTIONS } : {}"
    v-model="currentSection"
  >
    <HeaderMobile v-if="isMobile" />
    <HeroSection />
    <DifferenceSection />
    <ExploreModules :is-active="currentSection === 2"/>
    <EvolutionSection />
    <ShowingUpSection />
    <ContactSection />
  </component>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>

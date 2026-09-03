<script setup lang="ts">
import Test1Comp from '@/modules/Test1Comp.vue';
import Test2Comp from '@/modules/Test2Comp.vue';
import Test3Comp from '@/modules/Test3Comp.vue';
import SectionSlider from '@/shared/components/slider/SectionSlider.vue';

const sections = ['first', 'second', 'third'];
</script>

<template>
  <div class="home-page">
    <SectionSlider :sections="sections">
      <Test1Comp />
      <Test2Comp />
      <Test3Comp />
    </SectionSlider>
  </div>
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

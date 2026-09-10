<script setup lang="ts">
import LogoIcon from './icons/LogoIcon.vue';
import ScheduleButton from './ScheduleButton.vue';
</script>

<template>
  <div class="hero-header">
    <LogoIcon />
    <ScheduleButton />
  </div>
</template>

<style scoped>
.hero-header {
  display: flex;
  justify-content: space-between;
  align-items: end;

  p {
    font-size: 20px;
    font-weight: 700;
  }

  span {
    color: var(--color-accent);
  }
}
</style>

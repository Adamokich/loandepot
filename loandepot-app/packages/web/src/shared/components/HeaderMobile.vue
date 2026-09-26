<script setup lang="ts">
import ScheduleButton from './buttons/ScheduleButton.vue';
import LogoIcon from './icons/LogoIcon.vue';
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
  align-items: center;
  padding: 20px;

  p {
    font-size: 20px;
    font-weight: 700;
  }

  span {
    color: var(--color-accent);
  }

  :deep(a) {
    padding: 0;
  }
}

@media (max-width: 1023px) {
  .hero-header {
    :deep(a) {
      padding-right: 40px;
    }
  }
}

@media (max-width: 767px) {
  .hero-header {
    position: fixed;
    z-index: 1000;
    align-items: end;
    background-color: var(--color-light);
    width: 100%;

    :deep(a) {
      padding: 0;
    }
  }
}
</style>

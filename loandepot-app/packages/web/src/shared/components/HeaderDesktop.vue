<script setup lang="ts">
import ScheduleButton from './ScheduleButton.vue';
</script>

<template>
  <div class="hero-header">
    <p>show<span>up</span>:evolve</p>
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

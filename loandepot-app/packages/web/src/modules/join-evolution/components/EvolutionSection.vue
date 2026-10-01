<script setup lang="ts">
import { ScheduleButton } from '@/shared';
import EvolutionForm from './EvolutionForm.vue';
</script>

<template>
  <div class="join-evolution-section">
    <div class="join-evolution-wrapper container">
      <img src="../../../app/assets/img/Laptop.jpg" alt="Laptop" />
      <div class="join-evolution-left">
        <div class="join-evolution-left-top">
          <ScheduleButton color="#fff" icon-color="#fff" />
        </div>
        <div class="join-evolution-bottom">
          <h2 class="join-evolution-title">Join the Evolution</h2>
          <EvolutionForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.join-evolution-section {
  background-color: var(--color-accent);
  color: var(--color-light);
}

.join-evolution-wrapper {
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: 64px;
  padding-left: 0;
}

.join-evolution-left {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.join-evolution-left-top {
  display: flex;
  justify-content: end;
}

.join-evolution-bottom {
  display: flex;
  flex-direction: column;
  gap: 26px;
}
</style>

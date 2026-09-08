<script setup lang="ts">
import ScheduleIcon from './icons/ScheduleIcon.vue';
</script>

<template>
  <div class="schedule-appointment">
    <RouterLink class="schedule-appointment-link" to="#">
      <span>Schedule an appointment</span>
      <ScheduleIcon />
    </RouterLink>
  </div>
</template>

<style scoped>
.schedule-appointment-link {
  display: flex;
  align-items: center;
  gap: 40px;
  padding-top: 45px;
  padding-right: 40px;

  span {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>

<script setup lang="ts">
import ScheduleIcon from '../icons/ScheduleIcon.vue';

const { color = '#000000', iconColor = '#6d53af' } = defineProps<{
  color?: string;
  iconColor?: string;
}>();
</script>

<template>
  <div class="schedule-appointment">
    <RouterLink class="schedule-appointment-link" to="#">
      <span>Schedule an appointment</span>
      <ScheduleIcon :icon-color="iconColor" />
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
  color: v-bind(color);

  span {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>

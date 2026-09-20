<script setup lang="ts">
import { ScheduleButton } from '@/shared';
</script>

<template>
  <div class="difference-right-active">
    <div class="difference-right-active-top">
      <ScheduleButton />
    </div>
    <img src="../../../../app/assets/img/ShowUpBg_1.jpg" alt="video preview" />
  </div>
</template>

<style scoped>
.difference-right-active {
  padding-top: 102px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.difference-right-active-top :deep(a) {
  justify-content: end;
  padding-right: 0;
  position: absolute;
  right: -40px;
  top: 0;
}
</style>

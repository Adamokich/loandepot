<script setup lang="ts">
import { ScheduleButton } from '@/shared';
</script>

<template>
  <div class="difference-right-inactive">
    <div class="difference-right-inactive-top">
      <ScheduleButton />
    </div>
    <img src="../../../../app/assets/img/ShowUpBg_1.jpg" alt="video preview" />
  </div>
</template>

<style scoped>
.difference-right-inactive {
  padding-top: 102px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.difference-right-inactive-top :deep(a) {
  justify-content: end;
  padding-right: 0;
  position: absolute;
  right: -40px;
  top: 0;
}

@media (max-width: 1400px) {
  .difference-right-inactive {
    gap: 40px;
    padding-top: 45px;
  }

  .difference-right-inactive-top :deep(a) {
    position: static;
    width: 100%;
    max-width: 600px;
    padding-top: 0;
  }

  .difference-right-inactive {
    img {
      max-width: 600px;
    }
  }
}

@media (max-width: 1200px) {
  .difference-right-inactive {
    img {
      max-width: 530px;
    }
  }
}

@media (max-width: 1023px) {
  .difference-right-inactive {
    padding-top: 0;

    img {
      max-width: 100%;
      height: 549px;
      object-fit: cover;
    }
  }

  .difference-right-inactive-top :deep(a) {
    display: none;
  }
}

@media (max-width: 767px) {
  .difference-right-inactive {
    img {
      height: 549px;
    }

    gap: 0;
  }
}
</style>

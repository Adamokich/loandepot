<script setup lang="ts">
import { ScheduleButton } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import ShowingUpSlider from './ShowingUpSlider.vue';
import { useSwiper } from '../../../../../shared/composables/swiper.js';

const { onSwiperInit, onSlideChange, onSlideNext, onSlidePrev, activeIndex, swiperInstance } =
  useSwiper();
</script>

<template>
  <div class="showing-up">
    <div class="showing-up-top">
      <h2 class="showing-up-title">How are you Showing Up & Evolving</h2>
      <ScheduleButton />
    </div>
    <div class="showing-up-bottom">
      <ShowingUpSlider @init="onSwiperInit" @change="onSlideChange" :active-index="activeIndex" />
      <div class="showing-up-slider-controller">
        <div class="action-left" @click="onSlidePrev">
          <PlayIcon color="rgba(255, 255, 255, 0.5)" :width="9" :height="11" />
        </div>
        <div class="action-right" @click="onSlideNext">
          <PlayIcon color="rgba(255, 255, 255, 0.5)" :width="9" :height="11" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.showing-up {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.showing-up-top {
  height: 60%;
  display: flex;
  justify-content: space-between;
  padding-left: 64px;
  padding-top: 50px;

  :deep(a) {
    padding-top: 0;
  }
}

.showing-up-title {
  width: 100%;
  max-width: 700px;
}

.showing-up-bottom {
  position: relative;
  height: 40%;
  background-color: var(--color-accent);
}

.showing-up-slider-controller {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  max-width: 100px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 65px;
}

.action-left,
.action-right {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--color-light-opacity);
  border-radius: 50%;
  width: 43px;
  height: 43px;
  cursor: pointer;
  transition: all 0.4s ease;

  &:active {
    transform: scale(0.8);
  }
}

.action-left {
  svg {
    transform: rotate(180deg);
    margin-right: 3px;
  }
}

@media (max-width: 1200px) {
  .showing-up {
    overflow: hidden;
  }

  .showing-up-top {
    :deep(a) {
      display: none;
    }
  }

  .showing-up-title {
    font-size: 45px;
  }
}

@media (max-width: 991px) {
  .showing-up-slider-controller {
    display: none;
  }
}

@media (max-width: 767px) {
  .showing-up-top {
    padding-left: 20px;
  }

  .showing-up-title {
    height: 120px;
    font-size: 35px;
    padding-top: 40px;
  }
}

@media (max-width: 480px) {
  .showing-up-title {
    font-size: 30px;
  }
}
</style>

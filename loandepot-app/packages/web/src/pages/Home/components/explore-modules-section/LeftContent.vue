<script setup lang="ts">
import { BaseButton, ScheduleButton } from '@/shared';
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
import { isMobileKey, isMobileSmallKey } from '@/shared/constants/injectionKeys';
import { computed, inject } from 'vue';

const emit = defineEmits<{ prev: []; next: [] }>();
const isMobile = inject(isMobileKey);
const { activeIndex, totalSlides, progress } = defineProps<{
  activeIndex: number;
  totalSlides: number;
  progress: number;
}>();

const activeClass = computed(() => (activeIndex !== 0 ? true : false));
const isMobileS = inject(isMobileSmallKey);
</script>

<template>
  <div class="left-content">
    <div class="left-content-top">
      <div class="left-content-details">
        <p v-if="!isMobileS">show<span>up</span>:evolve</p>
        <div class="left-content-info">
          <h2 class="left-content-title">Explore <br />the Modules</h2>
          <p class="left-content-descr">Fifth step with some text and explanation</p>
        </div>
        <BaseButton>Get access</BaseButton>
      </div>
      <div v-if="!isMobile" class="left-content-slider-controller">
        <button
          class="prev-slide-btn"
          :class="{ 'active-btn': activeClass }"
          @click="emit('prev')"
          :disabled="activeIndex === 0"
        >
          <PlayIcon
            :width="9"
            :height="11"
            :color="activeIndex === 0 ? '#979797' : 'rgb(109,83,175)'"
          />
        </button>
        <button
          class="next-slide-btn"
          @click="emit('next')"
          :disabled="activeIndex === totalSlides - 1"
        >
          <PlayIcon
            :width="9"
            :height="11"
            :color="activeIndex === totalSlides - 1 ? '#979797' : 'rgb(109,83,175)'"
          />
          <svg
            v-if="activeIndex !== totalSlides - 1"
            :key="activeIndex"
            class="progress-ring"
            width="43"
            height="43"
            viewBox="0 0 43 43"
          >
            <circle class="progress-ring-bg" cx="21.5" cy="21.5" r="20" />
            <circle
              class="progress-ring-circle"
              cx="21.5"
              cy="21.5"
              r="20"
              :style="{
                strokeDasharray: '125.66',
                strokeDashoffset: 125.66 - (progress / 100) * 125.66,
              }"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="left-content-bottom">
      <img src="../../../../app/assets/img/hanson cut out.png" alt="Alec Hanson" />
      <figure class="left-content-author-info">
        <figcaption>
          <span class="author-name">Alec Hanson</span>
          <cite class="author-role">Your teacher</cite>
        </figcaption>
        <blockquote>
          <p class="author-quote">«We have 10 modules, you can see what are they about»</p>
        </blockquote>
      </figure>
    </div>
    <ScheduleButton v-if="isMobile && !isMobileS" class="schedule-btn" />
  </div>
</template>

<style scoped>
.left-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-top: 84px;
}

.left-content-top {
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 42px;
}

.left-content-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: start;

  p {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-dark);
    opacity: 0.4;
  }

  span {
    color: rgba(0, 0, 0, 0.3);
  }
}

.left-content-slider-controller {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.prev-slide-btn,
.next-slide-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 43px;
  cursor: pointer;
}

.prev-slide-btn:disabled,
.next-slide-btn:disabled {
  border: 3px solid var(--color-border-opacity);
  border-radius: 50%;
}

.prev-slide-btn {
  border: 3px solid var(--color-accent);
  border-radius: 50%;
}

.prev-slide-btn {
  transform: rotate(180deg);
}

.prev-slide-btn :deep(svg) {
  margin-left: 2px;
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: transparent;
  stroke: var(--color-border-opacity, rgb(234, 234, 234));
  stroke-width: 3px;
}

.progress-ring-circle {
  fill: transparent;
  stroke: var(--color-accent, rgb(109, 83, 175));
  stroke-width: 3px;
  stroke-linecap: round;

  stroke-dasharray: 276.46;
  stroke-dashoffset: 276.46;

  transform-origin: 21.5px 21.5px;

  transition: stroke-dashoffset 0.12s linear;
}

.left-content-bottom {
  width: 100%;
  max-width: 455px;
  padding-top: 18px;
  padding-right: 41px;
  box-shadow: 0 0 6px 6px var(--color-border-opacity);
  display: flex;
  gap: 23px;

  figure {
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin: 0;

    figcaption {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
  }

  blockquote {
    margin: 0;
  }
}

.author-name {
  font-size: 24px;
  color: var(--color-dark);
  font-family: var(--font-mark);
  font-weight: 900;
}

.author-role {
  font-size: 13px;
  font-weight: 500;
  font-style: normal;
  color: var(--color-accent);
  text-transform: uppercase;
}

.author-quote {
  font-weight: 900;
  color: var(--color-light-opacity);
}

@media (max-width: 1200px) {
  .left-content {
    position: relative;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    padding-inline: 20px;
    padding-top: 45px;
  }

  .schedule-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}

@media (max-width: 1023px) {
  .left-content-bottom {
    display: none;
  }
}
</style>

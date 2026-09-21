<script setup lang="ts">
import { computed, defineAsyncComponent, inject, ref } from 'vue';

import RightContentInactive from './RightContentInactive.vue';
import RightContentActive from './RightContentActive.vue';
import { HeaderMobile, ScheduleButton } from '@/shared/index.ts';
import { isMobileSmallKey } from '@/shared/constants/injectionKeys.ts';

const cards = [
  {
    cardNumber: 1,
    cardDescr: 'First step with some text and explanation',
  },
  {
    cardNumber: 2,
    cardDescr: 'Second step with some text and explanation',
  },
  {
    cardNumber: 3,
    cardDescr: 'Third step with some text and explanation',
  },
];

const isMobileS = inject(isMobileSmallKey);
const totalOpenedCards = ref<number[]>([0]);

const mobileCards = defineAsyncComponent(() => import('./InfoCardsMobile.vue'));
const desktopCards = defineAsyncComponent(() => import('./InfoCardsDesktop.vue'));

const currentCardsComponent = computed(() => (isMobileS?.value ? mobileCards : desktopCards));

const openedAllCards = computed<boolean>(() => {
  return totalOpenedCards.value.length > cards.length ? true : false;
});

const rightContentActiveClass = computed(() => {
  return openedAllCards.value ? 'difference-wrapper is-active' : 'difference-wrapper';
});
</script>

<template>
  <div class="difference">
    <HeaderMobile class="header-mobile" />
    <div :class="rightContentActiveClass">
      <div class="difference-left-content">
        <div class="difference-left-top">
          <h2 class="difference-title">The difference</h2>
          <p class="difference-descr">A retail LO’s guide to combating digital disruption</p>
          <div class="schedule-btn-link">
            <ScheduleButton icon-color="#ffffff" color="#ffffff" />
          </div>
        </div>
        <component
          :is="currentCardsComponent"
          :cards="cards"
          :total-opened-cards="totalOpenedCards"
        ></component>
      </div>
      <div class="difference-right-content">
        <Transition name="fade" mode="out-in">
          <RightContentInactive v-if="!openedAllCards" />
          <RightContentActive v-else />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.difference {
  height: 100vh;
}

.header-mobile {
  display: none;
}

.difference-wrapper {
  display: grid;
  grid-template-columns: 590px 669px;
}

.difference-left-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 39px;
  color: var(--color-light);
  background-color: var(--color-accent);
  padding-block: 65px 89px;
  padding-left: 64px;
  height: 100vh;
}

.card-info {
  transition: opacity 0.5s ease;
}

.is-active {
  gap: 196px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.schedule-btn-link {
  display: none;
}

.info-cards-mobile {
  display: none;
}

@media (max-width: 1400px) {
  .difference-wrapper {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }

  .difference-title {
    font-size: 55px;
  }
}

@media (max-width: 1200px) {
  .difference-left-content {
    padding-left: 35px;
  }

  .is-active {
    gap: 70px;
  }
}

@media (max-width: 1023px) {
  .difference-wrapper {
    grid-template-columns: 1fr;
    padding-inline: 0;
  }

  .difference-left-content {
    height: 700px;
    padding-inline: 20px;
  }

  .difference-left-top {
    position: relative;
  }

  .schedule-btn-link {
    display: block;
    position: absolute;
    right: 0;
    top: -70px;
  }

  .is-active {
    gap: 20px;
  }

  .difference-right-inactive {
    gap: 0;
  }
}

@media (max-width: 767px) {
  .schedule-btn-link {
    right: -30px;
    top: -95px;
  }

  .info-cards-desk {
    display: none;
  }

  .info-cards-mobile {
    display: block;
  }
}

@media (max-width: 480px) {
  .difference-left-content {
    padding-top: 0;
    height: 560px;
  }

  .difference-left-top {
    position: absolute;
    width: 100%;
    left: 0;
    padding-block: 25px 30px;
    padding-inline: 24px;
    background-color: var(--color-light);
    color: var(--color-dark);
  }

  .header-mobile {
    display: flex;
    padding-inline: 24px;
    padding-bottom: 18px;
  }

  .header-mobile :deep(a) {
    padding-right: 0;
  }

  .schedule-btn-link {
    display: none;
  }

  .difference-title {
    font-size: 40px;
  }

  .is-active {
    gap: 0;
  }
}
</style>

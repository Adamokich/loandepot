<script setup lang="ts">
import { computed, ref } from 'vue';
import CardInfo from './CardInfo.vue';

const { cards, totalOpenedCards } = defineProps<{
  cards: { cardNumber: number; cardDescr: string }[];
  totalOpenedCards: number[];
}>();

const isOpened = ref<boolean>(false);

const inactiveClass = computed(() => {
  return (num: number) => {
    return totalOpenedCards.includes(num) ? 'card-info' : 'card-info is-inactive';
  };
});

function onOpenCard(num: number): void {
  totalOpenedCards.push(num);
}

function onChangeActiveTab(newValue: boolean): void {
  isOpened.value = newValue;
}
</script>

<template>
  <div class="info-cards">
    <p>How loan officer work</p>
    <div class="info-cards-wrapper">
      <div class="info-card-tabs">
        <span :class="{ 'active-tab': !isOpened }" @click="onChangeActiveTab(false)"
          >10 years ago</span
        >
        <span :class="{ 'active-tab': isOpened }" @click="onChangeActiveTab(true)">Today</span>
      </div>
      <div class="info-card-tabs-view">
        <Transition name="fade" mode="out-in">
          <div v-if="!isOpened" class="opened-cards">
            <CardInfo
              v-for="card in cards"
              :key="card.cardNumber"
              :card-number="card.cardNumber"
              :card-descr="card.cardDescr"
              :is-active="true"
            />
          </div>
          <div v-else class="closed-cards">
            <CardInfo
              key="1"
              :card-number="1"
              :is-active="totalOpenedCards.includes(1)"
              :class="inactiveClass(0)"
              card-descr="First step with some text and explanation"
              @opened="onOpenCard(1)"
            />
            <CardInfo
              key="2"
              :card-number="2"
              :is-active="totalOpenedCards.includes(2)"
              :class="inactiveClass(1)"
              class="card-info"
              card-descr="Second step with some text and explanation"
              @opened="onOpenCard(2)"
            />
            <CardInfo
              key="3"
              :card-number="3"
              :is-active="totalOpenedCards.includes(3)"
              :class="inactiveClass(2)"
              class="card-info"
              card-descr="Third step with some text and explanation"
              @opened="onOpenCard(3)"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 14px;
    font-weight: 900;
    font-family: var(--font-mark);
  }
}

.info-cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.info-card-tabs {
  display: flex;
  gap: 25px;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  font-family: var(--font-mark);

  span {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: 0;
      background-color: var(--color-light);

      opacity: 0;
      transform: translateY(4px);
      transition: all 0.3s ease;
    }
  }
}

.opened-cards,
.closed-cards {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.is-inactive {
  opacity: 0;
  pointer-events: none;
}

.card-info {
  transition: opacity 2s ease;
}

.info-card-tabs span.active-tab::before {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .info-cards {
    position: absolute;
    padding-left: 16px;
    bottom: 35px;
    left: 5px;
    z-index: 10;
    height: 372px;
  }
}
</style>

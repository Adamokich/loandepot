<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from './Card.vue';
import CardInfo from './CardInfo.vue';
import RightContentInactive from './RightContentInactive.vue';
import RightContentActive from './RightContentActive.vue';

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

const totalOpenedCards = ref<number[]>([0]);
const openedAllCards = computed<boolean>(() => {
  return totalOpenedCards.value.length > cards.length ? true : false;
});

const inactiveClass = computed(() => {
  return (num: number) => {
    return totalOpenedCards.value.includes(num) ? 'card-info' : 'card-info is-inactive';
  };
});

function onOpenCard(num: number): void {
  totalOpenedCards.value.push(num);
}
</script>

<template>
  <div class="difference">
    <div class="difference-wrapper" :style="openedAllCards ? { gap: '196px' } : ''">
      <div class="difference-left-content">
        <div class="difference-left-top">
          <h2 class="difference-title">The difference</h2>
          <p class="difference-descr">A retail LO’s guide to combating digital disruption</p>
        </div>
        <div class="difference-info-cards">
          <div class="cards-left-info">
            <Card class="card-info-title"> How loan officer worked <span>10 years ago</span> </Card>
            <CardInfo
              v-for="card in cards"
              :key="card.cardNumber"
              :card-number="card.cardNumber"
              :card-descr="card.cardDescr"
              :is-active="true"
            />
          </div>
          <div class="cards-right-info">
            <Card class="card-info-title"> How loan officer works <span>today</span> </Card>
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
        </div>
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

.difference-info-cards {
  position: absolute;
  display: grid;
  column-gap: 32px;
  grid-template-columns: repeat(2, 328px);
  z-index: 20;
  top: 211px;
  width: 100%;
  max-width: 688px;
}

.cards-left-info,
.cards-right-info {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.card-info-title {
  font-size: 24px;
  font-family: var(--font-mark);
  font-weight: 900;
  max-height: 120px;
  padding: 28px 30px 23px 40px;

  span {
    position: relative;
    color: var(--color-accent);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      background-color: var(--color-accent);
      width: 100%;
      height: 4px;
    }
  }
}

.card-info {
  transition: opacity 0.5s ease;
}

.is-inactive {
  opacity: 0;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

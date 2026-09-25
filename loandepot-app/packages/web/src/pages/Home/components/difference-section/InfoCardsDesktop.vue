<script setup lang="ts">
import { computed } from 'vue';
import Card from './Card.vue';
import CardInfo from './CardInfo.vue';

const { cards, totalOpenedCards } = defineProps<{
  cards: { cardNumber: number; cardDescr: string }[];
  totalOpenedCards: number[];
}>();

const inactiveClass = computed(() => {
  return (num: number) => {
    return totalOpenedCards.includes(num) ? 'card-info' : 'card-info is-inactive';
  };
});

function onOpenCard(num: number): void {
  totalOpenedCards.push(num);
}
</script>

<template>
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
        card-descr="Second step with some text and explanation"
        @opened="onOpenCard(2)"
      />
      <CardInfo
        key="3"
        :card-number="3"
        :is-active="totalOpenedCards.includes(3)"
        :class="inactiveClass(2)"
        card-descr="Third step with some text and explanation"
        @opened="onOpenCard(3)"
      />
    </div>
  </div>
</template>

<style scoped>
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

.cards-left-info,
.cards-right-info {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.is-inactive {
  opacity: 0;
  pointer-events: none;
}
</style>

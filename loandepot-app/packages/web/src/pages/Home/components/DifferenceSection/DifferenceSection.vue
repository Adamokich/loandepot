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

const openedCards = ref<number>(0);

const openedAllCards = computed<boolean>(() => {
  return openedCards.value === cards.length * 2 ? true : false;
});

function totalCardsInc(): void {
  openedCards.value++;
}
</script>

<template>
  <div class="difference">
    <div class="difference-wrapper">
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
              @opened="totalCardsInc"
            />
          </div>
          <div class="cards-right-info">
            <Card class="card-info-title"> How loan officer works <span>today</span> </Card>
            <CardInfo
              v-for="card in cards"
              :key="card.cardNumber"
              :card-number="card.cardNumber"
              :card-descr="card.cardDescr"
              @opened="totalCardsInc"
            />
          </div>
        </div>
      </div>
      <div class="difference-right-content">
        <RightContentInactive v-if="!openedAllCards" />
        <RightContentActive v-else />
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
  gap: 196px;
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
</style>

<script setup lang="ts">
import PlusIcon from '@/shared/components/icons/PlusIcon.vue';
import QuetionIcon from '@/shared/components/icons/QuetionIcon.vue';
import Card from './Card.vue';
import { formatNumber } from '@/shared/utils/formatters.ts';

const { cardNumber, cardDescr, isActive } = defineProps<{
  cardNumber: number;
  cardDescr: string;
  isActive: boolean;
}>();

const emit = defineEmits<{ opened: [] }>();

function clickOnButton(): void {
  emit('opened');
}
</script>

<template>
  <Card class="card-info">
    <Transition name="fade" mode="out-in">
      <div v-if="isActive" class="card-info-active">
        <span>{{ formatNumber(cardNumber) }}</span>
        <p>{{ cardDescr }}</p>
      </div>
      <div v-else class="card-info-inactive">
        <div class="card-info-question-icon">
          <QuetionIcon />
        </div>
        <div class="card-info-inactive-click">
          Click to show
          <button class="card-info-button" @click="clickOnButton">
            <PlusIcon />
          </button>
        </div>
      </div>
    </Transition>
  </Card>
</template>

<style scoped>
.card-info {
  padding-block: 22px 20px;
  padding-right: 30px;
  max-height: 83px;
}

.card-info-active,
.card-info-inactive {
  display: flex;
  gap: 53px;
  align-items: center;
}

.card-info-active {
  span {
    position: relative;
    color: var(--color-accent);
    opacity: 0.5;
    font-size: 24px;
    font-family: var(--font-mark);
    font-weight: 900;
    padding-left: 29px;

    &::after {
      content: '';
      position: absolute;
      background-color: var(--color-border-opacity);
      height: 83px;
      right: -25px;
      width: 1px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  p {
    font-weight: 900;
    font-size: 14px;
  }
}

.card-info-question-icon {
  position: relative;
  padding-left: 29px;

  &::before {
    content: '';
    position: absolute;
    background-color: var(--color-border-opacity);
    height: 76px;
    right: -25px;
    width: 1px;
    top: -22px;
  }
}

.card-info-inactive-click {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  max-width: 191px;
}

.card-info-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: var(--color-success);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0px 0px 2px 2px var(--color-shadow-success);
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

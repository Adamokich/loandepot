<script setup lang="ts">
import { Select } from 'vue3-select-component';
import 'vue3-select-component/styles';
import ChevronDown from './icons/ChevronDown.vue';
import GlobeIcon from './icons/GlobeIcon.vue';
import { MUTABLE_CITY_SELECT_OPTIONS } from '@loandepot/shared';

const { placeholder } = defineProps<{ placeholder: string }>();
const modelValue = defineModel<string | null | number>({ default: null });
</script>

<template>
  <div class="base-select">
    <label>
      <span>From</span>
      <Select
        class="select"
        v-model="modelValue"
        :options="MUTABLE_CITY_SELECT_OPTIONS"
        :placeholder="placeholder"
      >
        <template #trailing-icon>
          <ChevronDown />
        </template>
      </Select>
      <GlobeIcon class="glob-icon" />
    </label>
  </div>
</template>

<style scoped>
.base-select {
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 11px;
    font-weight: 900;
    width: 100%;
    max-width: 265px;
  }
}

.select {
  width: 100%;

  font-weight: 900;

  --vs-min-height: 64px;
  --vs-padding-x: 24px;
  --vs-background-color: var(--color-bg-input);
  --vs-font-size: 14px;
  --vs-font-weight: 900;
  --vs-text-color: var(--color-light);
  --vs-border: none;
  --vs-placeholder-color: var(--color-light);
}

.glob-icon {
  position: absolute;
  right: 53px;
  bottom: 21px;
  opacity: 0.3;
  pointer-events: none;
}
</style>

<style>
[data-select-listbox] {
  --vs-option-background-color: var(--color-accent);
  --vs-option-text-color: var(--color-light);
  --vs-option-font-weight: 900;
  --vs-option-selected-background-color: var(--color-light);
  --vs-option-focused-background-color: var(--color-accent);
  --vs-option-focused-text-color: var(--color-light);
  --vs-menu-background-color: var(--color-accent);
  --vs-option-disabled-background-color: var(--color-border-accent);
  --vs-border: none;
}

#select-option-2:hover {
  --vs-option-focused-background-color: var(--color-light);
  --vs-option-focused-text-color: var(--color-dark);
}

[data-dismissable-layer] {
  transform-origin: top center;
}

[data-dismissable-layer][data-state='open'] {
  animation: selectMenuShow 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

[data-dismissable-layer][data-state='closed'] {
  animation: selectMenuHide 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes selectMenuShow {
  from {
    opacity: 0;
    transform: translateY(-8px) scaleY(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes selectMenuHide {
  from {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  to {
    opacity: 0;
    transform: translateY(-8px) scaleY(0.95);
  }
}
</style>

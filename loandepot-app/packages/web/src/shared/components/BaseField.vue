<script setup lang="ts">
import { useId } from 'vue';
import { vMaska } from 'maska/vue';

defineOptions({
  inheritAttrs: false,
});

const { type, placeholder, label, mask } = defineProps<{
  type: string;
  placeholder: string;
  label?: string;
  mask?: string;
}>();

const inputId = useId();
const modelValue = defineModel<string>({ default: '' });

function onFocusMask(e: FocusEvent): void {
  if (mask && !modelValue.value) {
    modelValue.value = '+7 (';
  }
}
</script>

<template>
  <div class="base-field">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <div class="input-wrapper">
      <input
        @focus="onFocusMask"
        v-model="modelValue"
        v-bind="$attrs"
        v-maska
        :data-maska="mask"
        :type="type"
        :placeholder="placeholder"
        :id="inputId"
      />
      <div class="input-icon-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-field {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 11px;

  label {
    font-size: 15px;
    font-family: var(--font-mark);
    font-weight: 900;
    cursor: pointer;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    max-width: 340px;

    &:focus-within {
      .input-icon-slot {
        color: var(--color-accent);
        opacity: 1;
      }
    }

    input {
      width: 100%;
      min-height: 64px;
      padding-inline: 24px 56px;
      background-color: rgba(216, 216, 216, 0.3);
      border-radius: var(--border-radius);
      outline: none;
      transition: all 0.3s ease;
      font-weight: 900;

      &::placeholder {
        color: var(--color-light);
        font-weight: 900;
      }

      &:focus {
        background-color: var(--color-light);
        color: var(--color-dark);
        font-weight: 900;
      }
    }
  }

  .input-icon-slot {
    position: absolute;
    right: 26px;
    top: 50%;
    transform: translateY(-50%);

    color: var(--color-light);
    opacity: 0.2;
    transition: all 0.3s ease;
  }
}
</style>

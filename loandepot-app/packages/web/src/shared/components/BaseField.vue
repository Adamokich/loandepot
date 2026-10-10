<script setup lang="ts">
import { useId } from 'vue';
import { vMaska } from 'maska/vue';
import type { IBaseFieldProperties } from '@loandepot/shared';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<IBaseFieldProperties>();

const inputId = useId();
const modelValue = defineModel<string>({ default: '' });

function onFocusMask(e: FocusEvent): void {
  if (props.mask && !modelValue.value) {
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

  --field-bg: v-bind('props.bgColor || "rgba(216, 216, 216, 0.3)"');
  --field-bg-focus: v-bind('props.bgFocusColor || "#FFFFFF"');
  --field-text: v-bind('props.textColor || "#fff"');
  --field-text-focus: v-bind('props.textFocusColor || "#000"');
  --field-icon-focus: v-bind('props.iconFocusColor || "#6d53af"');
  --field-icon-color: v-bind('props.iconColor || "#fff"');
  --field-placeholder: v-bind('props.placeholderColor || "#FFF"');
}

.base-field label {
  font-size: 15px;
  font-family: var(--font-mark);
  font-weight: 900;
  cursor: pointer;
}

.input-wrapper {
  position: relative;
  width: 100%;
  max-width: 340px;
}

.input-wrapper:focus-within .input-icon-slot {
  color: var(--field-icon-focus);
  opacity: 1;
}

.input-wrapper input {
  color: var(--field-text);
  width: 100%;
  min-height: 64px;
  padding-inline: 24px 56px;
  background-color: var(--field-bg);
  border-radius: var(--border-radius);
  border: none;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 900;
}

.input-wrapper input::placeholder {
  color: var(--field-placeholder);
  font-weight: 900;
  padding-left: 1px;
}

.input-wrapper input:focus {
  background-color: var(--field-bg-focus);
  color: var(--field-text-focus);
  font-weight: 900;

  &::placeholder {
    color: var(--field-text-focus);
  }
}

.input-icon-slot {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--field-icon-color);
  opacity: 0.2;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-icon-slot :deep(svg) {
  color: currentColor;
}
</style>

<script setup lang="ts">
const { bgColor } = defineProps<{
  bgColor?: string;
}>();
</script>

<template>
  <button class="base-button" :style="{ backgroundColor: bgColor }">
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  color: var(--color-light);
  border-radius: var(--border-radius);
  background-color: var(--color-accent);
  padding: 20px 50px;
  font-family: var(--font-mark);
}
</style>

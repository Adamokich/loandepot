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
  transition: all 0.4s ease;
}

@media (hover: hover) {
  .base-button:hover {
    transform: translateY(-10px);
    opacity: 0.8;
  }
}
</style>

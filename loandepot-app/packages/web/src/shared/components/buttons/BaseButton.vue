<script setup lang="ts">
import { RouterLink } from 'vue-router';
const { bgColor } = defineProps<{
  bgColor?: string;
}>();
</script>

<template>
  <RouterLink to="#" class="base-button" :style="{ backgroundColor: bgColor }">
    <slot></slot>
  </RouterLink>
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

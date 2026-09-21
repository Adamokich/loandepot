<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue';
const { url = '#' } = defineProps<{ url?: string }>();
</script>

<template>
  <RouterLink :to="url" class="hero-modules-view-all-link">
    <PlusIcon />
  </RouterLink>
</template>

<style scoped>
.hero-modules-view-all-link {
  display: block;
  width: 20px;
  height: 20px;
  background-color: var(--color-success);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px 4px var(--color-shadow-success);
}
</style>

<script setup lang="ts">
import PlayIcon from '../icons/PlayIcon.vue';
</script>

<template>
  <button class="video-button">
    <span>Why</span>
    <PlayIcon :width="8" :height="11" />
  </button>
</template>

<style scoped>
.video-button {
  display: flex;
  justify-content: center;
  gap: 32px;
  align-items: center;
  padding: 20px 50px;
  border: 2px solid rgba(151, 151, 151, 0.5);
  border-radius: var(--border-radius);
}
</style>

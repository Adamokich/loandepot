<script setup lang="ts">
import PlayIcon from '@/shared/components/icons/PlayIcon.vue';
</script>

<template>
  <div class="home">
    <h1>Hello</h1>
    <PlayIcon class="play" />
  </div>
</template>

<style scoped>
.home {
  font-family: var(--font-mark);
}
.play {
  margin-left: 30px;
}
</style>

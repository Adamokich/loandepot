<script setup lang="ts">
const {
  width = 68,
  height = 68,
  bgColor = 'FFFFFF',
} = defineProps<{
  width?: number;
  height?: number;
  bgColor?: string;
}>();
</script>

<template>
  <button class="play-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.play-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: v-bind("width + 'px'");
  height: v-bind("height + 'px'");
  background-color: v-bind('#' + bgColor);
}
</style>

<script setup lang="ts">
const { width, height, color } = defineProps<{ width: number; height: number; color?: string }>();
</script>

<template>
  <svg
    viewBox="0 0 14 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    fill="none"
    customFrame="#000000"
  >
    <path
      id="Triangle 3"
      d="M14 8L0 16L0 0L14 8Z"
      :fill="color ? color : 'rgb(109,83,175)'"
      fill-rule="nonzero"
    />
  </svg>
</template>

<script setup lang="ts"></script>

<template>
  <div class="difference-card-title">
    <slot></slot>
  </div>
</template>

<style scoped>
.difference-card-title {
  background-color: var(--color-light);
  width: 100%;
  max-width: 388px;
  border-radius: var(--border-radius-l);
  color: var(--color-dark);
}

@media (max-width: 480px) {
  .difference-card-title {
    width: 330px;
  }
}
</style>

<script setup lang="ts">
const { message } = defineProps<{ message: string }>();
const emit = defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div class="error-msg-container">
    <span>{{ message }}</span>
    <button class="retry-btn" @click="emit('retry')">Повторить попытку</button>
  </div>
</template>

<style scoped>
.error-msg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: transparent;

  span {
    color: var(--color-light);
    font-weight: 700;
  }
}

.retry-btn {
  background-color: var(--color-dark);
  border-radius: var(--border-radius-l);
  color: var(--color-light);
  width: 200px;
  padding-block: 20px;
  transition: all 0.3s ease;
  font-weight: 600;
}

@media (hover: hover) {
  .retry-btn:hover {
    background-color: var(--color-light);
    color: var(--color-dark);
  }
}
</style>

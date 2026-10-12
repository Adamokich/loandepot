<template>
  <div class="loader-container">
    <div class="loader-ring"></div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
}

.loader-ring {
  width: 45px;
  height: 45px;
  border: 6px solid var(--color-light);
  border-top-color: var(--color-accent);
  border-right-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

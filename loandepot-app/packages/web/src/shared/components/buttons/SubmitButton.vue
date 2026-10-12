<template>
  <button class="submit-btn" type="submit"><slot></slot></button>
</template>

<style scoped>
.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 197px;
  min-height: 64px;
  background-color: var(--color-dark);
  color: var(--color-light);
  font-size: 15px;
  font-family: var(--font-mark);
  font-weight: 900;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

@media (hover: hover) {
  .submit-btn:hover {
    background-color: var(--color-light);
    color: var(--color-dark);
  }
}
</style>

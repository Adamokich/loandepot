<script setup lang="ts">
import { onUnmounted, watch } from 'vue';

const props = defineProps<{
  videoUrl: string;
  name: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{ (e: 'close'): void }>();

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
);

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="video-modal-overlay" @click="emit('close')">
        <div class="video-modal">
          <iframe class="video" :src="videoUrl" :title="name" loading="lazy"></iframe>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.video-modal-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  margin-inline: auto;
}

.video-modal {
  width: 100%;
  display: flex;
  justify-content: center;
}

.video {
  width: 50%;
  height: auto;
  aspect-ratio: 16 / 9;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .video-modal {
  transform: scale(0.9) translateY(20px);
}

.modal-fade-leave-to .video-modal {
  transform: scale(0.95) translateY(0);
}
</style>

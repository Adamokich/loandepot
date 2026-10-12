<script setup lang="ts">
import ContactForm from './ContactForm.vue';
import ContactInfo from './ContactInfo.vue';
</script>

<template>
  <div class="contact">
    <ContactInfo />
    <ContactForm />
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 796px 559px;
  gap: 65px;
}

@media (max-width: 1520px) {
  .contact {
    grid-template-columns: 796px 1fr;
    padding-right: 20px;
  }
}

@media (max-width: 1440px) {
  .contact {
    grid-template-columns: 722px 1fr;
    padding-right: 20px;
  }
}

@media (max-width: 1200px) {
  .contact {
    grid-template-columns: 600px 1fr;
  }
}

@media (max-width: 1023px) {
  .contact {
    display: flex;
    flex-direction: column;
    gap: 45px;
    padding-right: 0;
    padding-bottom: 20px;
  }
}

@media (max-width: 767px) {
  .contact {
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .contact {
    gap: 24px;
    padding-bottom: 32px;
  }
}
</style>
